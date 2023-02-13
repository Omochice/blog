---
layout: zenn.tsx
title: "xfceでマルチモニタ間のwindowの移動をする"
category: "xfce"
excerpt: ""
---

gnome であれば `super + Left or Right...` で別のモニタに window を移動できる。

xfce ではタイル表示は標準で搭載されているが、モニタ間の移動は提供されていない。

調べた結果、実装している人がいたためありがたく使う。
[GitHub - calandoa/movescreen: Linux script to move windows across screens](https://github.com/calandoa/movescreen)

Python での実装なので Golang 等でワンバイナリになってるものがほしいなあ。
