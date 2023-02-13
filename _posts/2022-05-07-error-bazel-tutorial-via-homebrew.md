---
layout: post
title: "Bazelのbuild時に`1-homebrew`のエラーが出る問題"
category: "mac"
excerpt: ""
---

## 要約

以下を実行する。

```console
$ brew remove bazel
$ brew install bazelisk
```

## 経緯

コマンドラインからiOSアプリのビルドをしたくて[bazel](https://bazel.build)のチュートリアルをやっているときに次のようなエラーが出た。

```sh
ERROR: Traceback (most recent call last):
        File "/private/tmp/examples/tutorial/WORKSPACE", line 45, column 28, in <toplevel>
                java_appengine_repositories()
        File "/private/var/tmp/_bazel_<user>/fb01e8410fe0ff286a6d99e646765849/external/io_bazel_rules_appengine/appengine/java_appengine.bzl", line 321, column 35, in java_appengine_repositories
                bazel_version = tuple([int(n) for n in native.bazel_version.split(".")])
Error in int: invalid base-10 literal: "1-homebrew"
ERROR: error loading package 'external': Package 'external' contains errors
INFO: Elapsed time: 0.085s
INFO: 0 processes.
FAILED: Build did NOT complete successfully (0 packages loaded)
```

どうやらバージョンの解析時にエラーが出ているらしい。

記法を見るとpythonっぽい。

バージョンを確かめてみる。

```console
$ bazel --version
bazel 5.1.1-homebrew
```

どうやらこの`5.1.1-homebrew`をパースしようとしてエラーを吐いているみたい。(`"1-homebrew"`を`int`に変換しようとしている)

bazel公式のページを見てみるとbazelのインストールの方法は以下のように書いてある。

> Recommended: Use Bazelisk
> Use the binary installer
> Use Homebrew
> Compile Bazel from source

Recommendedなので`Bazelisk`経由で入れてみる。

```console
$ brew remove bazel
$ brew install bazelisk
```

この状態で`bazel --version`をしてみる。

```console
$ bazel --version
bazel 5.1.1
```

これでビルドができるようになった。
