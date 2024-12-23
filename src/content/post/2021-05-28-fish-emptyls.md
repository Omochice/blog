---
title: "空enterでlsを実行するプラグインを作った"
date: 2021-05-28
topics: ["shell"]
excerpt: ""
type: tech
---

作った。
[![Omochice/emptyls-fish - GitHub](https://gh-card.dev/repos/Omochice/emptyls-fish.svg)](https://github.com/Omochice/emptyls-fish)

## 顛末

> 空 Enter で ls が実行されると便利

みたいな話をよく聞くので `fish` でも同じようなことができないかと思って調べたら `zsh` にはプラグインとしてあるみたい。

Qiita に[fishshell で Enter 押したときに ls と git status を表示する - Qiita](https://qiita.com/marcy_o/items/d51773cdd110d77cfdd8)がある。
この記事では `<c-j>` にバインドしているが、コマンドの実行のイベントで空なら分岐の方式にしたかったので調べてみた。

- [function - create a function — fish-shell 3.2.2 documentation](https://fishshell.com/docs/current/cmds/function.html)

どうやら空のコマンドを実行したときには `--on-event <pre|post>exec` が発行されないように新しいバージョンで変わったらしい。
[fish_preexec is no longer triggered on empty commands, no way to restore old behavior #8020](https://github.com/fish-shell/fish-shell/issues/8020)

個人的に `Enter` にバインドするものは今後増える可能性があると思ってるのでバインドしたくはなかった。

```fish
function fish_user_key_bindings
    bind \r emptyls
end
```

ここで地味に詰まった。
最初は `bind \r` ではなくて `bind -k enter` にしていたが、`enterには割当がない` みたいなエラーが出た。
