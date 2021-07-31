---
layout: post
title: "denops-popupをカーソル下に出そうとして詰まった"
category: "Vim"
excerpt: ""
---

# {{ page.title }}

最近は`denops.vim`を使ったプラグインを作っている。

popup/floating(vimとneovimで呼び方が違う)を使おうとすると色々差異があって面倒なので、[hrsh7th/denops-popup](https://github.com/hrsh7th/denops-popup)を使うのが楽だと思う。

しかし、このモジュールの`open`では特定のバッファの中身を表示するだけなので、新規になにかを表示させたいときには少し手間がいる。

なので、うまいこと調整してくれるサンプルを作っていた。

[Omochice/dps-popup-test](https://github.com/Omochice/dps-popup-test/tree/fc981ebf53f9db8aecded0e894dea1fdd9042e76)(これ名前sampleとかのほうが良かったかな？　)

このコミット段階だとウィンドウを複数開いたときうまくいかない。

具体的には、`line(".")`などがウィンドウの相対での数値になる。

しかし、popup/floatingでの位置はウィンドウの相対位置ではなく、スクリーンの相対位置なのでカーソル直下に出そうとしてるのにうまくいかない。

これに対処するため、[prabirshrestha/vim-lsp](https://github.com/prabirshrestha/vim-lsp)の`LspHover`の実装を追っていた。

内部では`screencol/row`を使っていて、スクリーンの相対位置の座標を取得していた。

これをdenops側でもやろうとしていたが、一部詰まったので記録する。

## echo/echomsg/console.logをすると位置がずれる

実際どんな値が入っているのか調べるため、vim-lspをcloneしてechomsgを埋め込んだところ、次のようになった。

![underCursor?](https://i.gyazo.com/40d81695550c1123051851b609848971.png)

`LspHover`の結果がカーソル下に出てほしいが、`echomsg`を噛ませた結果、右上にずれている。

おそらくecho/echomsgが発生するとscreencol/rowの値が書き換わるのか位置が変わるのではないかと思っている（要検証）

## `:<C-u>DpsTest<CR>`すると(1, 1)に表示される

これはscreencol/rowの仕様でコマンドラインから呼ぶとコマンドラインでの位置が返ってくるので(1, 1)になる。

でも`:LspHover<CR>`で(1, 1)にならないのはこれが[非同期で実行されているかららしい。](https://github.com/prabirshrestha/vim-lsp/blob/7ba553effb021293c9ff5176b91e76da71797825/autoload/lsp/internal/document_hover/under_cursor.vim#L36)(よくわかってない)

denops側でこれを回避するには次のように書くとよい。

```typescript
await execute(
    denops,
    `
    command! DpsTest call denops#request('${denops.name}', 'dpsTest', [])
    nnoremap <Plug>(DpsTest) <Cmd>DpsTest<CR>
    `,
);
```

`<Cmd>`を使うことでコマンドラインを回避している。

`:<C-u> ~~~`の変わりに`<Cmd>`を使うが、これは比較的新しい機能らしく、昔のvimでは動かない。

しかし、**denopsが動くvimのバージョン** > **\<Cmd>が使えるバージョン**なのでdenopsで使うのは問題なさそう。

