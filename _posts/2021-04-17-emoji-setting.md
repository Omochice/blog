---
layout: post
title: "manjaroでアイコンフォントなどが豆腐になることへの対処"
category: ""
excerpt: ""
---

# {{ page.title }}

manjaroでzennの記事を書くときに 🐜 とかが豆腐になっていてとても書きにくかったのをなんとかしたときのメモ。

## 手順

1. `noto`の各種フォントを入れる
   たぶんOSごとの一貫性を保とうとするなら最適解な気がする。

```console
$ wget https://noto-website-2.storage.googleapis.com/pkgs/Noto-hinted.zip
$ unzip Noto-hinted.zip -d ~/.local/share/fonts/Noto-hinted
```

2. `noto-emoji`を入れる
   hintedにemojiがなかったから追加で入れたけどいらない可能性が高い。

```console
$ wget https://github.com/googlefonts/noto-emoji/raw/v2020-09-16-unicode13_1/fonts/NotoColorEmoji.ttf -O ~/.local/share/fonts/Noto-hinted/NotoColorEmoji.ttf
$ wget https://github.com/googlefonts/noto-emoji/raw/v2020-09-16-unicode13_1/fonts/NotoEmoji-Regular.ttf  -O ~/.local/share/fonts/Noto-hinted/NotoEmoji-Regular.ttf
```

3. キャッシュのアップデート

```console
$ fc-cache -vf
```

これで絵文字 🐜 とかが使えるようになっているはず。
