---
layout: post
title: "rofiの設定についての覚え書き"
category: "cui"
excerpt: ""
---

# {{ page.title }}

デスクトップ環境にはxfceを使っているが、`ctrl-r`で起動するランチャーがなんかきれいじゃなくて気に食わないので[rofi](https://github.com/davatorium/rofi)を導入してみた。
その時の設定の覚え書きを書く。

## rofi のリポジトリ

rofiのリポジトリは [davatorium/rofi](https://github.com/davatorium/rofi)と [adi1090x/rofi](https://github.com/adi1090x/rofi)の2箇所ある。

最初?? ?? となったのでそれぞれをまとめる。

- davatorium/rofi
  `yay -S rofi`で参照されるリポジトリ。
  rofi本体のコードがある。
- adi1090x/rofi
  rofiのthemeがまとめられてるリポジトリ。
  自分でいじるにしてもここにあるthemeを元にするのが楽。

なので、インストールは`yay -S rofi`でやり、themeなどをいじるのに別途リポジトリをcloneする。

## テーマをいじる

rofiは先述のthemeを入れないままだとさすがに無骨すぎる。
なのでthemeを入れるわけだが、普段のvimなどがnightowlなので自分で合わせていじる。

```text
ALPHA="#00000000"
BG="#011627"
FG="#80a4c2ff"
SELECT="#300aabff"
ACCENT="#1d3b53"
```

それっぽい色になったので満足。

## キーバインドをいじる

themeのインストールをすると`~/.config/rofi/config.rasi`が作成されるのでこれに書き足す。
colorfulの`style_3`を選んだのでとりあえずjとkの移動をつける。
デフォルトで使ってるバインディングを消さないとエラーになるので`rofi -show keys`で確認しながら設定した。

```
  /* enable vim j/k  */
  kb-row-up:     "Up,Control+p,Shift+Tab,Control+k";
  kb-row-down:   "Down,Control+n,Control+j";
  /* disable j/k */
  kb-accept-entry: "Return,KP_Enter";
  kb-remove-to-eol: "";
```
