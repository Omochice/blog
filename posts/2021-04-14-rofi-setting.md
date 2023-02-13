---
layout: zenn.tsx
title: "rofiの設定についての覚え書き"
category: "cui"
excerpt: ""
type: tech
---

# {{ page.title }}

デスクトップ環境には xfce を使っているが、`ctrl-r` で起動するランチャーがなんかきれいじゃなくて気に食わないので[rofi](https://github.com/davatorium/rofi)を導入してみた。
その時の設定の覚え書きを書く。

## rofi のリポジトリ

rofi のリポジトリは [davatorium/rofi](https://github.com/davatorium/rofi)と [adi1090x/rofi](https://github.com/adi1090x/rofi)の 2 箇所ある。

最初?? となったのでそれぞれをまとめる。

- davatorium/rofi
  `yay -S rofi` で参照されるリポジトリ。
  rofi 本体のコードがある。
- adi1090x/rofi
  rofi の theme がまとめられてるリポジトリ。
  自分でいじるにしてもここにある theme を元にするのが楽。

なので、インストールは `yay -S rofi` でやり、theme などをいじるのに別途リポジトリを clone する。

## テーマをいじる

rofi は先述の theme を入れないままだとさすがに無骨すぎる。
なので theme を入れるわけだが、普段の vim などが nightowl なので自分で合わせていじる。

```text
ALPHA="#00000000"
BG="#011627"
FG="#80a4c2ff"
SELECT="#300aabff"
ACCENT="#1d3b53"
```

それっぽい色になったので満足。

## キーバインドをいじる

theme のインストールをすると `~/.config/rofi/config.rasi` が作成されるのでこれに書き足す。
colorful の `style_3` を選んだのでとりあえず `j` と `k` の移動をつける。
デフォルトで使ってるバインディングを消さないとエラーになるので `rofi -show keys` で確認しながら設定した。

```
  /* enable vim j/k  */
  kb-row-up:     "Up,Control+p,Shift+Tab,Control+k";
  kb-row-down:   "Down,Control+n,Control+j";
  /* disable j/k */
  kb-accept-entry: "Return,KP_Enter";
  kb-remove-to-eol: "";
```
