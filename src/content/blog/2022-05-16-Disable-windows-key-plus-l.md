---
title: "Windows11でWindows+Lを無効化する"
topics: [""]
excerpt: ""
type: tech
---

i3-wmを使っているが、Windowsを使わざるを得なくなったときに`Windows(super) + L`のショートカットが暴発して大変にフラストレーションが溜まっていた。

検索をしてみるとレジストリを書き換えることで無効化できるようだが、ミスをしてうまく反映されなかったのでまとめる。

## 要約

`HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System`に`DisableLockWorkstation: 1`なDWORD(32bit)をセットする


## うまくいかなったわけ

*HKEY_CURRENT_USER*ではなく*HKEY_CURRENT_MACHINE*に追加していた。
