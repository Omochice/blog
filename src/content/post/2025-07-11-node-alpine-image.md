---
title: "node-alpineにdebianベースがありそう"
date: 2025-07-11
topics: ["node", "docker"]
excerpt: ''
type: tech
---

おま環かもしれないがメモ。

`node:22.17.0-alpine@sha256:0c0734eb7051babbb3e95cd74e684f940552b31472152edf0bb23e54ab44a0d7`に`apk`がなくて`apt`が入ってる。

ベースがdebianになってそう。

dockerhubにはないのでyankされたのかもしれない。

```console
$ docker container run --rm -it node:22.17.0-alpine@sha256:0c0734eb7051babbb3e95cd74e684f940552b31472152edf0bb23e54ab44a0d7 bash
root@7700c67abf77:/# cat /etc/os-release
PRETTY_NAME="Debian GNU/Linux 12 (bookworm)"
NAME="Debian GNU/Linux"
VERSION_ID="12"
VERSION="12 (bookworm)"
VERSION_CODENAME=bookworm
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"
```

現時点の<https://hub.docker.com/layers/library/node/22.17.0-alpine/images/sha256-13a6ecbb39fab9a009ac0ec61cb4cd16282ace26026bf1ba8d1a387e1298b108>はちゃんとalpineベースなのでそっちを使えば取り敢えずはなんとかなる。

そもそもなにしようとしていたんだっけ？
