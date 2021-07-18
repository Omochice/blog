---
layout: post
title: "vimですでに出ているwindowを雨が書きして出力を出す方法"
category: "Vim"
excerpt: ""
---

# {{ page.title }}

denops.vimを使ってプラグインを書いているときに使った（引用した）tipsを備忘録的にまとめる。

- すでに開いてるwindowを上書きして出力を出す。

引用元は[thinca/vim-quickrun](https://github.com/thinca/vim-quickrun/blob/master/autoload/quickrun/outputter/buffer.vim#L114)。

```vim
  if bufexists(config.bufname)
    let bufnr = bufnr(s:escape_file_pattern(config.bufname))
    let wins = win_findbuf(bufnr)
    let tabnr = tabpagenr()
    call filter(map(wins, 'win_id2tabwin(v:val)'), 'v:val[0] is# tabnr')
    if empty(wins)
      execute config.opener fnameescape(config.bufname)
      let opened = 1
    else
      execute wins[0][1] 'wincmd w'
    endif
  else
    execute config.opener fnameescape(config.bufname)
    setlocal bufhidden=hide buftype=nofile noswapfile nobuflisted
    setlocal fileformat=unix
    let bufnr = bufnr('%')
    let opened = 1
  endif
```

流れとしてはこんな感じ。

1. 指定の名前で開いているバッファがあるか調べる（`bufnr()`）
2. あればそのバッファの番号を取得
3. バッファ番号を含むwindowのidを取得
4. カレントのタブにそのwindowがあるか確認
5. あればそのウィンドウに移動する

これをtypescriptに移植すると以下のようになった。

```typescript
let bufnr: number;
const bufExist = await denops.call("bufexists", config["bufname"]);
if (bufExist) {
    bufnr = await denops.call("bufnr", `^${config["bufname"]}$`) as number;
    const wins = await denops.call("win_findbuf", bufnr) as number[];
    const tabnr = await denops.call("tabpagenr") as number;
    const ww = await denops.eval(
      `filter(map([${wins}], "win_id2tabwin(v:val)"), "v:val[0] is# ${tabnr}")`,
    ) as number[][]; // [ [tabnr, winnr] ] TODO replace map(), filter() in typescrit

    if (ww.length == 0) {
      await execute(denops, `${opener} ${config["bufname"]}`);
    } else {
      await execute(denops, `${ww[0][1]} wincmd w`);
    }
} else {
    await execute(denops, `${opener} ${config["bufname"]}`);
    await execute(
      denops,
      `
      setlocal bufhidden=hide buftype=nofile
      setlocal noswapfile nobuflisted
      setlocal nomodified
      setlocal fileformat=unix
      `,
    );
    bufnr = await denops.call("bufnr", "%") as number;
}
```

一箇所だけ`denops.eval`を使っている部分（`map`と`filter`を使っている部分）が残っているが、それぞれの関数内で別途`await`するとなんだかなあって感じがしたのでそのままにしている。


