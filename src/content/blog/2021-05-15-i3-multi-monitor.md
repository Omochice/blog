---
title: "i3でマルチモニタをしようとしてハマった話"
topics: ["i3-wm"]
excerpt: ""
type: tech
---

今まで xfce を使ってきて i3 に乗り換えた（前の記事を参照）

マルチモニタ環境でうまくやるために `i3-workscreen` を入れたわけだが、たまに `i3-workscreen` の起動と同時に画面が落ちるようになった。

この問題の解決方法とたどり着くまでの道筋を記録する。

## 要約

`xrandr` だけで制御するのは難しそうなので `xorg.conf` を併用する。

## 道筋

最終的にこのようにつなぎたかった。

![モニタの並べ方](https://i.gyazo.com/53ef3504a73b9f6b0b6ffd777bc30cb1.png)

まず、問題の切り分けをした。

- xfce で動くか
  　問題なく 3 枚がつながるので i3 で動いている何かが問題
- 直接 `xrandr` を実行しても画面が落ちるか
  　一気に 3 枚つなごうとすると落ちる
- 1 つずつつなぐとどうなるか
  DP2-2 はつながるが、DP2-1 をつなごうとすると `Xrandr: Configure crtc 1 failed` が出てきてつながらない
  ただし、画面は落ちない

画面が落ちるのに関しては `ctrl alt F3` で tty3 が起動し、`startx` が実行できることから x server が落ちていることがわかった。

eDP を off にしたりすると DP2-1 もつながったりしたが、いまいち再現性がないので別の方策を探すことにした。

**xrandr 3 monitors**と検索するとこの記事が一番上に来る（DackDackGo の場合）。
[xrandr three monitors](https://unix.stackexchange.com/questions/315871/xrandr-three-monitors)

この記事にはこう書かれている。

> I'm not very familiar with xrandr that's why I usually would start with a simple fixed setup in /etc/X11/xorg.conf, like this for your case:

どうやら xorg.conf でもマルチディスプレイの設定ができるらしい。

arch Wiki にも同様のことが書かれている。

[マルチディスプレイ - ArchWiki](https://wiki.archlinux.jp/index.php/%E3%83%9E%E3%83%AB%E3%83%81%E3%83%87%E3%82%A3%E3%82%B9%E3%83%97%E3%83%AC%E3%82%A4)

これを設定すると lightdm の起動時（正しくは xserver の起動時）にディスプレイを検知する。

適用されると、lightdm のログイン画面の時点で 3 枚のモニタが別々に認識されている。

3 枚が認識されている状態 `xrandr` や `i3-workscreen` を実行すると希望通りの動作をする。

### ついでなので接続が切れたりした時にもうまく動くようにする

teratail で上記の問題を質問したところ、`udev` でモニタの切断・接続のイベントに応じてコマンドが発行できることを知った。

よく見ると `i3-workscreen` にも同様のことが書かれている。

なので設定する。

```conf
SUBSYSTEM=="drm" ACTION=="change", RUN+="i3-workscreen"
```

これで動くはず。
