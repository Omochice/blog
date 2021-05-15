---
layout: post
title: "i3でマルチモニタをしようとしてハマった話"
category: "i3-wm"
excerpt: ""
---

# {{ page.title }}

今までxfceを使ってきてi3に乗り換えた（前の記事を参照）

マルチモニタ環境でうまくやるために`i3-workscreen`を入れたわけだが、たまに`i3-workscreen`の起動と同時に画面が落ちるようになった。

この問題の解決方法とたどり着くまでの道筋を記録する。

## 要約

`xrandr`だけで制御するのは難しそうなので`xorg.conf`を併用する。

## 道筋

最終的にこのようにつなぎたかった。

![モニタの並べ方](https://i.gyazo.com/53ef3504a73b9f6b0b6ffd777bc30cb1.png)

まず、問題の切り分けをした。

- xfceで動くか
  　問題なく3枚がつながるのでi3で動いている何かが問題
- 直接`xrandr`を実行しても画面が落ちるか
  　一気に3枚つなごうとすると落ちる
- 1つずつつなぐとどうなるか
  DP2-2はつながるが、DP2-1をつなごうとすると`Xrandr: Configure crtc 1 failed`が出てきてつながらない
  ただし、画面は落ちない

画面が落ちるのに関しては`ctrl alt F3`でtty3が起動し、`startx`が実行できることからx serverが落ちていることがわかった。

eDPをoffにしたりするとDP2-1もつながったりしたが、いまいち再現性がないので別の方策を探すことにした。

**xrandr 3 monitors**と検索するとこの記事が一番上に来る（DackDackGoの場合）
[xrandr three monitors](https://unix.stackexchange.com/questions/315871/xrandr-three-monitors)

この記事にはこう書かれている。

> I'm not very familiar with xrandr that's why I usually would start with a simple fixed setup in /etc/X11/xorg.conf, like this for your case:

どうやらxorg.confでもマルチディスプレイの設定ができるらしい。

arch wikiにも同様のことが書かれている。

[マルチディスプレイ - ArchWiki](https://wiki.archlinux.jp/index.php/%E3%83%9E%E3%83%AB%E3%83%81%E3%83%87%E3%82%A3%E3%82%B9%E3%83%97%E3%83%AC%E3%82%A4)

これを設定するとlightdmの起動時（正しくはxserverの起動時）にディスプレイを検知する。

適用されると、lightdmのログイン画面の時点で3枚のモニタが別々に認識されている。

3枚が認識されている状態`xrandr`や`i3-workscreen`を実行すると希望通りの動作をする。

### ついでなので接続が切れたりした時にもうまく動くようにする

teratailで上記の問題を質問したところ、`udev`でモニタの切断・接続のイベントに応じてコマンドが発行できることを知った。

よく見ると`i3-workscreen`にも同様のことが書かれている。

なので設定する。

```conf
SUBSYSTEM=="drm" ACTION=="change", RUN+="i3-workscreen"
```

これで動くはず。
