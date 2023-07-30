---
layout: zenn.tsx
title: "canny edge detectionをfortranで書く"
topics: [""]
excerpt: ""
type: tech
---

# canny edge detection

1. gaussian filter でノイズ除去
1. sobel filter でエッジを検出
1. 検出したエッジの向きを考慮して細線化
1. しきい値で 2 値化

らしい。

gaussian filter, sobel filter はフィルタをかけるだけなので比較的簡単。

github で `canny edge detection langages:fortran` で調べたがヒットはなかった。

エッジの方向検出がいまいち納得できてない。

```fortran
if ((way >= -1*PI/8 .and. way < PI/8) .or. (way < -7*PI/8 .or. way >= 7*PI/8)) then
  edges = edge_magnitudes(h - 1:h + 1, w)
else if ((way >= PI/8 .and. way < 3*PI/8) .or. (way >= -7*PI/8 .and. way < -5*PI/8)) then
  edges = (/edge_magnitudes(h - 1, w - 1), edge_magnitudes(h, w), edge_magnitudes(h + 1, w + 1)/)
else if ((way >= 3*PI/8 .and. way < 5*PI/8) .or. (way >= -5*PI/8 .and. way < -3*PI/8)) then
  edges = edge_magnitudes(h, w - 1:w + 1)
else
  edges = (/edge_magnitudes(h + 1, w - 1), edge_magnitudes(h, w), edge_magnitudes(h - 1, w + 1)/)
end if
```

上から順に"-", "/", "|", "\"の方向の場合分けになっている。
エッジに対する法線が `way` で `atan2(dy, dx)` で求めていて$\pi <= atan2 <= \pi$で返ってくるらしい
法線だからそれに沿って配列を取得すればいいはずだけどこれだと法線に垂直方向(要するにエッジの方向)で取ってきてる。
逆にすると変な感じになったのでこれでいいんだと思う。
`atan2` がそもそもにエッジの法線ではないのか？

## しきい値

ヒステリシスしきい値とかいうらしい
`low_threshold` と `high_threshold` を作っておいて `low` より低いのはエッジじゃない、`high` より高いのはエッジとする。
間のものは `high` に隣接していればエッジということにするらしい。(どうやってこの値を求めるんだ？　)
この隣接がよくわからない。
本当に 8 近傍だけ見て判断するのか再帰的にたどっていってエッジ部分を伸ばしていくのかどっちなんだろう。
とりあえず再帰的にたどっていこうと思ったけど fortran に queue が基本データ構造として存在しない。
調べたら実装してた人がいたのでありがたくコードを借りる。
~~hashmap もなかったし formula の translation には必要ないってことなのか~~

~~Python とかで opencv 叩いたほうが絶対早い~~
