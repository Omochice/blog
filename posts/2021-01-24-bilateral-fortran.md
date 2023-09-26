---
title: fortranでバイラテラルフィルタをつくる
topics: &ref_0
  - fortran
excerpt: ''
type: tech
author: Omochice
tags: *ref_0

---
# Fortran でバイラテラルフィルタをつくる

canny に続いて birateral filter を作った。

```fortran
  subroutine bilateral(img, output, sigma)
  !!! apply bilateral filter
  !!!
  !!! inputs:
  !!!   img(integer, 2D): image array.
  !!!   output(integer, 2D): ouput array.
  !!!   sigma(real): use in gaussian distribution.

    implicit none
    integer, intent(in), dimension(:, :) :: img
    integer, intent(out), dimension(:, :) :: output
    real, intent(in) :: sigma
    integer :: i, w, h, width, height, center, img_shape(2), window(5, 5)
    real :: gaussian_dist(0:255), tmp_array(25), weighted_filter(5, 5)
    real, parameter, dimension(5, 5) :: filter = reshape((/1, 4, 6, 4, 1, &
                                                           4, 16, 24, 16, 4, &
                                                           6, 24, 36, 24, 6, &
                                                           4, 16, 24, 16, 4, &
                                                           1, 4, 6, 4, 1/), shape(filter))

    img_shape = shape(img)
    height = img_shape(1)
    width = img_shape(2)

    gaussian_dist = (/(exp(-(real(i)/255)**2/(2*sigma**2)), i=0, 255)/)

    do w = 3, width - 2
      do h = 3, height - 2
        window = img(h - 2:h + 2, w - 2:w + 2)
        center = img(h, w)
        tmp_array = reshape(abs(window - center), shape(tmp_array))
        tmp_array = (/(gaussian_dist(int(tmp_array(i))), i=1, size(tmp_array))/)
        weighted_filter = filter*reshape(tmp_array, shape(filter))
        output(h, w) = max(0, min(255, &
                                  nint(sum(window*weighted_filter)/sum(weighted_filter)) &
                                  ))
      end do
    end do
    call fill_edge(output, 2)
  end subroutine bilateral
```

## 仕組み

注目画素を含む周囲 25 画素だったり 9 画素だったりに対してガウス分布に基づく重みを乗じた和を新しい値とするのがガウシアンフィルタ。
それだとエッジが薄れるから、注目画素と近い輝度のものは重視(~1)し、輝度が違うものはあまり寄与しないように(~0)にする重み加えるのがバイラテラルフィルタ。

注目画素(今回は 5\*5)なので `3~width-2` までに対して周辺 25 画素を。

```fortran
window = img(h - 2:h + 2, w - 2:w + 2)
```

で取ってる。
中央との差を `tmp_array` に入れて、差に応じたガウス分布の重みに置換する。
その重みをもとのフィルタに乗じてフィルタリングをする。

毎画素ごとにガウス分布を求めるのは冗長みたいなので予め 0~255 の範囲のガウス分布を求めておく。

```fortran
gaussian_dist = (/(exp(-(real(i)/255)**2/(2*sigma**2)), i=0, 255)/)
```

よくある Lenna の画像に対して 3 回このフィルタを適用するとこうなる。

![org image](/gh-pages/images/Lenna.png)
![filtered image](/gh-pages/images/bilateralLenna.png)

コードが間違えてなければ多分エッジが残った形でノイズが消えてるんだと思う。
