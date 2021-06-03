---
layout: post
title: "lexima.vimとasyncomplete.vimのキーバインドにハマった話"
category: "vim"
excerpt: ""
---

# {{ page.title }}

先日、vim.jpで[auto-pairs のプラグインでハマった部分の解決策を教えてもらった](https://vim-jp.org/slacklog/CLKR04BEF/2021/05/#ts-1621244693.416300)。

そのときに[lexima.vim]()を勧めてもらったので試していたが、キーバインド周りで詰まったのでまとめておく。

## 何が起きたか

- asyncompleteの補完表示中のキーバインドが意図した挙動をしない。
- 上記の問題が時折起こる（毎回起こるわけではない）

私は[dein.vim]()の`hook_add`でキーバインドを以下のように設定している。

```vim
hook_add = """
inoremap <expr> <C-j> pumvisible() ? "\<C-n>" : "\<C-j>"
inoremap <expr> <Tab> pumvisible() ? "\<C-n>" : "\<Tab>"
inoremap <expr> <C-k> pumvisible() ? "\<C-p>" : "\<C-k>"
inoremap <expr> <S-Tab> pumvisible() ? "\<C-p>" : "\<S-Tab>"
inoremap <expr> <CR> pumvisible() ? "\<C-y>" : "\<CR>"
imap <C-space> <Plug>(asyncomplete_force_refresh)
let g:asyncomplete_auto_completeopt = 1
let g:asyncomplete_matchfuzzy = 1
let g:asyncomplete_auto_popup = 1
"""
```

補完表示が出ているときに`<Tab>`を押すと補完の選択、`<CR>`で確定のバインドをしている。

しかし、`lexima.vim`を導入した後、時折このバインドが発動せずに通常の`<Tab>`,`<CR>`の挙動をすることが起きるようになった。

かつ、この挙動が起きない時（正常に動いているように見える時）には`lexima`の`input_after`の挙動がうまくいかないように見えた。

```text
(|)
[`|`の位置で<CR>を入力すると]
(
|
)
```

## 調べた内容

- 何がトリガになっているか
  - `<CR>`にバインドされているものは`lexima`と`asyncomplete`だけ
- どういう状況で起こるのか
  - `dein.toml`の`hook_add`に`echo`を仕込んで読み込み順序を確認した

これらをやったところ、どうやら`asyncomplete -> lexima`の順に読み込むと補完のバインドがおかしくなることがわかった。
また、`lexima`のissueを見ると、[同様の issue](https://github.com/cohama/lexima.vim/issues/104)があった。

このissueは`asyncomplete`ではなさそうだが、同様に`<CR>`のバインドがうまくできないようだ。

## 解決策

- 読み込み順序を指定する
  `asyncomplete`のプラグイン設定を`dein_lazy.toml`に移動し、`on_source`オプションで`lexima.vim`を読み込んだ後に読み込むように変更した。
  また、`<CR>`を`lexima`の評価を混ぜるように変更した。

```vim
[[plugins]]
hook_add = """
inoremap <expr> <C-j> pumvisible() ? "\<C-n>" : "\<C-j>"
inoremap <expr> <Tab> pumvisible() ? "\<C-n>" : lexima#expand("<LT>Tab>","i")
inoremap <expr> <C-k> pumvisible() ? "\<C-p>" : "\<C-k>"
inoremap <expr> <S-Tab> pumvisible() ? "\<C-p>" : "\<S-Tab>"
inoremap <expr> <CR> pumvisible() ? "\<C-y>" : lexima#expand("<LT>CR>", "i")
imap <C-space> <Plug>(asyncomplete_force_refresh)
let g:asyncomplete_auto_completeopt = 1
let g:asyncomplete_matchfuzzy = 1
let g:asyncomplete_auto_popup = 1
"""
repo = "prabirshrestha/asyncomplete.vim"
depends = "lexima.vim"
on_source = "lexima.vim" # if load this binding before loading lexima, override this bindings by lexima's and not work fine.
```

個人的には`asyncomplete`の設定に`lexima`の関数が出てくるのが気に食わないが、`depends`に`lexima`を指定しているので妥協できる。
（`dein`の`depends`の仕様がよくわかっていない。指定するだけでは読み込まず、別途`[[plugins]]`しなければならないことは知っているが…）
