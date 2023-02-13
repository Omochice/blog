---
layout: zenn.tsx
title: "Self-hostedなgitlabをglab-cliでデフォルトに設定する"
topics: ["gitlab"]
excerpt: ""
type: tech
---

github-cliと同じように使えるツールに[glab-cli](https://github.com/profclems/glab/)というものがある。

デフォルトでは`gitlab.com`に対して操作をするようになっているが、これをself-hostしているgitlabを見るように変更したい。


## 方法

```sh
$ GITLAB_HOST=<Self-hosted-uri> glab cmd...
```

環境変数で設定してやればよい。

## 試したがうまくいかなかった方法

`$XDG_CONFIG_DIR/glab-cli/config.yml`を変更する。

`hosts:`の中にある`gitlab.com`の記述をコメントアウトしてself-hostedのみにしたが、反映されなかった。


### 参考

[https://github.com/profclems/glab/issues/686](https://github.com/profclems/glab/issues/686)
