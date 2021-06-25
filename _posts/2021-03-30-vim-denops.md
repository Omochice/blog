---
layout: post
title: "vimの拡張機能をDenoで書いた話"
category: "vim"
excerpt: ""
---

# {{ page.title }}

[denops で vim の codic 拡張機能を書いた](https://zenn.dev/omochice/articles/67922b4970c32ec0899a)

詳しい話はzennに書いているのでそっちを参照。

拡張機能を書くにあたって言語を`vim script`か`Deno`か`lua`かそれとも他かを選ぶ必要があった。

- Vim(not NeoVim)を使っているので`lua`は除外
- 最近`Deno`で書けるようになって一部で盛り上がっているみたい
- `TypeScript`やってみたい

以上の理由から`Deno`を選んだ。

`Deno`のLinterをVimに入れるところなどのコーディング以前の部分で詰まったりしたがなんとか書くことができた。

反省点。

- 型よくわからん
  全部の変数に型つけるんだとばかり思っていたのでPythonみたいにつけてもつけなくてもいいのは衝撃的だった
  (でもやっぱりできるだけたくさんつけたほうがいいのかもしれない )
- `var`,`let`,`const`よくわかってない
  　`var`は昔ので再代入がなければ`const`がいいみたいな認識。
  `for (const datum of data)`って書けるのがよくわからん（`datum`は`data`の各要素で書き換えられるから`let`では？）

それはそうと`start(async (vim) => {`以降が`Async arrow function has no 'await' expression.`でlinterが怒ってるけどいいんだろうか？
