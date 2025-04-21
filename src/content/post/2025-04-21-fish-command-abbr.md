---
title: "fishのabbrはcommandが違っても同一名で登録できない"
date: 2025-04-21
topics: ["fish"]
excerpt: ''
type: tech
---

もろもろのツールの管理を最近nixに寄せはじめた。

ついでにfishのabbrを整理したので、まとめる。

いつのまにかにfishのv4が出て、rustになっていた(rustになってv4でたのは知ってたけどちゃんと追ってなかった)。

[4.0.0](https://github.com/fish-shell/fish-shell/releases/tag/4.0.0)には色々なfeatが入ってて、[Restricting abbreviations](https://github.com/fish-shell/fish-shell/pull/10452)がしれっと入ってた。

(これも入ったことは聞いてたけどちゃんと見てなかった)

zshとかだと[`zeno.zsh`](https://github.com/yuki-yano/zeno.zsh)が似たようなことができる(というよりこっちのが色々できるはず？)。

例えば`docker run`を`docker container run`にexpandできる。

いままでのfishだと`run`を何かにexpandすることはできたが、`docker`のあとの`run`をーみたいな条件がつけられなかった。

なので、`docker ~~~~`系をexpandするpluginを生やした。

[Omochice/docker-abbreviations.fish: Docker abbreviations for fish-shell](https://github.com/Omochice/docker-abbreviations.fish)

`docker --help`出てきたコマンドを片っ端から並べただけの力技plugin。

入っているdockerのversionとかを考慮していないオレオレプラグインだけど、ここに供養する。

ついでに調べた知見だが、`--command`が別でも複数は登録できないっぽい。

なので以下をやっても後者が使われるようだ。

```fish
$ fish -v
fish, version 4.0.1

$ abbr --command foo bar baz bar

$ abbr --command hoge bar piyo bar

$ foo bar<Space>
# 展開されない

$ hoge bar<Space>
# hoge piyo barになる
```

zenoならできそうな気もする。
