---
layout: zenn.tsx
title: "fortranで大津の2値化を書く"
topics: ["fortran"]
excerpt: ""
math: true
type: tech
---

# {{ page.title }}

## 2 値化

グレースケールの画像中の画素を一定の法則で 2 値(0 or 1)に変換すること。

単純な 2 値化(ある輝度値を基準にそれ以下かどうかで 0, 1 とする)は次のように書ける。

<script src="https://gist.github.com/Omochice/67ed526561a484a3575e379ac1ae0c5c.js"></script>

このしきい値を自動で決めるのが大津の 2 値化である。

## 大津の 2 値化

大津の 2 値化では、ある輝度値$V$を境目にしたとき、それ以下の領域(クラス 1)とそれ以上の領域(クラス 2)の分離度ができるだけ大きくなるような値を算出する。

詳しい解説は他に譲ることとして、分離度は以下のように定義される。

$$
\frac{\sigma_b^2}{\sigma_t^2 - \sigma_b^2}
$$

$\sigma_b^2$は、それぞれのクラスの中での画素の数、画素値の平均、分散をそれぞれ$\omega_i, m_i, \sigma_i^2$とすると次のように表せる。

$$
\sigma_b^2 = \frac{\omega_1  \omega_2(m_2 - m_{total})^2}{(\omega_1 + \omega_2)^2}
$$

$\omega_1+\omega2$は全体の画素数で一定なので算出するのは分子側だけでよい。

これが最大となる$V_x$を見つける。

fortran で書くとこうなった。

<script src="https://gist.github.com/Omochice/2e112851dfd01c063ddaeb8e43a00297.js"></script>

ところどころ 1000 とかで割っているので画像サイズによっては 8bit の real 型ではオーバーフローして `var` の値が負になることがあったためである。
(本当は画像サイズに合わせて割る数値を `size(img)` みたいに動的にしたほうが良さそう。)

また、入力 `img` は読み込みの関数の都合上 3 次元配列を受け取るように書いた。

### 参考

[判別分析法（大津の二値化）　画像処理ソリューション](https://imagingsolution.blog.fc2.com/blog-entry-113.html)u
