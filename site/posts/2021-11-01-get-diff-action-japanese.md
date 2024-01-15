---
title: "`get-diff-action`で日本語のファイルを抽出する"
topics: ["git"]
excerpt: ""
type: tech
---

Github Actions で直前コミットとの差分を取って変更があったファイルを抽出する [Action](https://github.com/technote-space/get-diff-action) がある。

これを使って記事の更新があったときにタイムスタンプを自動で更新するワークフローを書いていた。
しかし、日本語(多分マルチバイト文字全般)を含むファイル/ディレクトリが含まれるとき、それが抽出されなかったので対処をまとめる。

対象のリポジトリは [Omochice/gh-sed-test](https://github.com/Omochice/gh-sed-test) 。

日本語のファイル/ディレクトリがあったとき、実行されている `git diff` の出力は以下のようになる。

```sh
git diff '560f9ea70dbfaeffa358e249a92b16d78564a233...e0827a5eb894a9fbcfa7102ccb41627d2dfe8e78' '--diff-filter=AMRC' --name-only
  >> "\346\227\245\346\234\254\350\252\236.md"
```

日本語部分がエスケープされる。

以降の処理でこのファイルは無視される。(本当は `DIFF` にいて欲しい)

そのため、`git config --local core.quotepath false` でエスケープ処理をしないようにする。

これにより `git diff` の出力は以下のようになる。

```sh
git diff '560f9ea70dbfaeffa358e249a92b16d78564a233...e0827a5eb894a9fbcfa7102ccb41627d2dfe8e78' '--diff-filter=AMRC' --name-only
  >> "日本語.md"
```

これで `DIFF` に `日本語.md` が追加され、以降の処理の対象にできる。
