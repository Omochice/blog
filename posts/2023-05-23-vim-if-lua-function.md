---
layout: zenn.tsx
title: "vimのif_luaがよくわからない"
topics: ["vim", "lua"]
excerpt: ""
type: tech
---


vimでlightlineの設定を書きたくてdictにfuncrefを入れたい。


```lua
vim.g.lightline = {
  component_function = {
    component_name = function() ...
  },
}
```

みたいなコードを書いた時に、vimだと`Couldn't convert lua value`と怒られてしまう。


変数にluaの`function`を入れれないのかと言われればそうでもない。

```lua
vim.g.Sample = function() return 42 end
```

みたいなコードは通ってくれる。（`funcref`の代入の制約で変数名の先頭は大文字になるが）


エラー文自体は[if_lua.c#L1861](https://github.com/vim/vim/blob/50809a45ebde327cb6fdcc727d7466e926aed713/src/if_lua.c#L1861)にある。

代入は[dict.c#378](https://github.com/vim/vim/blob/50809a45ebde327cb6fdcc727d7466e926aed713/src/dict.c#L378)でやっていて、ここが失敗しているっぽい。

よくわからん。
