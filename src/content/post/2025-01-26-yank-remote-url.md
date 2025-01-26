---
title: "yank-remote-urlからsystemlist依存を剥した"
date: 2025-01-26
topics: ["vim"]
excerpt: ''
type: tech
---

[yank-remote-url.vim](https://github.com/Omochice/yank-remote-url.vim)というローカルのコードをGitHubのリンクでyankするプラグインを作っている。

もくもく会で[yank-remote-url.vim](https://github.com/Omochice/yank-remote-url.vim)から`systemlist`の依存を剥した。

`systemlist`はコマンド実行をして標準出力を取得する関数。

これをoriginのURLを取ったり、HEADのcommit hashを取るのに使っていた。

これを直接`.git`の`config`だったり`refs`だったりをパース(もどき)して取得するように変えた。

これで微妙にひっかかる挙動を改善できてるはず。

`magic`前提だったりパースが適当だったりするが、取り敢えず動いてるのでヨシ。
