---
title: "fortranでラプラシアンフィルタを書く"
topics: ["fortran"]
excerpt: ""
type: tech
---

## ラプラシアンフィルタ

ラプラシアンフィルタは画像の各画素に対して周囲 4 あるいは 8 領域との輝度値の差を求めるフィルタの一種である。

今回は周囲 8 近傍へのフィルタを使う。

```text
--使うフィルタ--
+---+----+---+
| 1 | 1  | 1 |
+---+----+---+
| 1 | -8 | 1 |
+---+----+---+
| 1 | 1  | 1 |
+---+----+---+
```

実装されたフィルタは以下の通り。(gist のテストを兼ねて)

<script src="https://gist.github.com/Omochice/f492c61082cc8ab8c4eda882be41b961.js"></script>

`lap` と `laplacian` を作った。
それぞれ `forall` と三重ループの差異がある。
また、fortran は配列が高次元側から割り付けられるため、`w`, `h`, `d` の順で内側へ行くようにした。

## 速度比較

それぞれ以下のコードで速度を確かめる。

<script src="https://gist.github.com/Omochice/d15b767dfefce11d940ccc1bceaa7c5b.js"></script>

1. lap

```text
________________________________________________________
Executed in    2.20 secs   fish           external
   usr time    2.19 secs  963.00 micros    2.19 secs
   sys time    0.01 secs  259.00 micros    0.01 secs
```

1. laplacian

```text
________________________________________________________
Executed in    1.87 secs   fish           external
   usr time  1858.59 millis  669.00 micros  1857.92 millis
   sys time    6.84 millis  183.00 micros    6.66 millis
```

10 ミリ秒と 6 ミリ秒だが若干 `for` ループの方が早いみたい。
もしかしたら `forall` 内での変数順が `d, h, w` なのが悪いのかもしれない。
逆にして試してみる。

1. lap(forall を逆順)

```text
________________________________________________________
Executed in    2.51 secs   fish           external
   usr time    2.50 secs  581.00 micros    2.50 secs
   sys time    0.01 secs  174.00 micros    0.01 secs
```

何回か試したがミリ秒での表示にならなかった。(fish の time よくわからん)
多分 `for` の方が早いんだと思う。
