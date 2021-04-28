---
layout: post
title: "xfceでマルチモニタ間のwindowの移動をする"
category: "xfce"
excerpt: ""
---

# {{ page.title }}

gnomeであれば`super + Left or Right...`で別のモニタにwindowを移動できる。

xfceではタイル表示は標準で搭載されているが、モニタ間の移動は提供されていない。

調べた結果、実装している人がいたためありがたく使う。
[GitHub - calandoa/movescreen: Linux script to move windows across screens](https://github.com/calandoa/movescreen)

pythonでの実装なのでGolang等でワンバイナリになってるものがほしいなあ。
