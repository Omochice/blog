---
title: "denops.vim で作ったプラグインを dein.vim の `on_cmd` でロードできるようにした"
topics: [""]
excerpt: ""
type: tech
---

今まで denops.vim を使ってプラグインを作ってきたが、どれも 100％Typescript で書いてある。

コマンドの定義まで Typescript でやっているため、プラグインを読み込んだ直後にはコマンドが何もない状態になる。

そのため、dein.vim の `on_cmd` で遅延ロードをしようとするとコマンドが定義されていないエラーが発生する。

コマンド定義部分を Vim script で書いたので、忘れないようにまとめておく。

 1. コマンド定義を Typescript から Vim script に移動する。
    例えば、 Typescript で以下のようなコマンド定義をしている場合、次のようになる。

    ```typescript
    await execute(
      denops,
      `
      command! DenopsSample call denops#notify("${denops.name}", "sampleFunc", [])
      `
    )
    ```

    これを Vim script に移動する。

    ( `plugin/sample.vim` )
    ```vim
    if exists('g:loaded_sample_vim') && g:loaded_sample_vim
      finish
    endif

    let g:loaded_sample_vim = v:true

    command! DenopsSample call denops#notify('sample', 'sampleFunc', [])
    ```

    ここで、 `denops.name` 部分が `sample` に置き換わっているが、これはプラグインの `denops` ディレクトリの子の名前にする。
    今回は `denops/sample/main.ts` に記述されていると想定している。

2. コマンド定義を動くようにする
    このままだと、 denops が読み込まれる前に `denops#notify` が呼ばれ、エラーになるので読み込み待ち処理を `autoload` 下に定義する。

    ( `autoload/sample.vim` )
    ```vim
    function! sample#call() abort
      call denops#plugin#wait('sample')
      call dneops#notify('sample', 'sampleFunc', [])
    endfunction
    ```

    この関数を `command!` から呼び出すようにする。

    ( `plugin/sample.vim` )
    ```vim
    if exists('g:loaded_sample_vim') && g:loaded_sample_vim
      finish
    endif

    let g:loaded_sample_vim = v:true

    command! DenopsSample call sample#call()
    ```

