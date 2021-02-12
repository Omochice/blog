---
layout: post
title: "Fortranで階調補正をする"
category: "fortran"
excerpt: ""
---

# {{ page.title }}

## ヒストグラム伸張化

画像中の輝度値の分布に偏りがある(画像全体が暗いetc)ときに輝度値の分布を補正することで見やすくする。
具体的には次の式を各画素に適用する。

$$
V_{after} = \mathrm{min}(V_{max}, \mathrm{max}(0, \frac{V_{before} - V_{min}}{V_{max} - V_{min}} \times V_{mam}))
$$

fortranのpure functionで書くと次のようになる。

```fortran

pure function linear_translation(img, maximum) result(translated)
  implicit none
  integer, intent(in) :: img(:, :, :)
  integer, intent(in) :: maximum
  integer, allocatable :: translated(:, :, :), lut(:)
  integer :: i, v_max, v_min

  v_min = minval(img)
  v_max = maxval(img)

  allocate (lut(0:maximum))
  do i=0, maximum
      lut(i) = min(maximum, max(0, int(real(i) - v_min) / (v_max - v_min) * maximum))
  end do
  translated = lut(img)
end function linear_translation
```

画素毎に計算をするのはコスト的にアレなので先に`look up table(lut)`を作っておくことで楽をする。

fortranだとわざわざループしてlutを適用しなくても`translated = lut(img)`で各画素ごとによしなにしてくれるが、可読性がちょっと気になる。

また、画素値0や画素値255が1画素だけ混じっていたりするとそれがストッパーになってヒストグラムが引き伸ばせなくなるのでオプショナルに設定できるようにする。

結果以下のようになった。

```fortran
pure function linear_translation(img, maximum_value, low_threshold, high_threshold) result(translated)
  implicit none
  integer, intent(in) :: img(:, :, :)
  integer, intent(in), optional :: maximum_value, low_threshold, high_threshold
  integer :: d, w, h, img_shape(3), i, v_max, v_min, m
  integer, allocatable :: lut(:), translated(:, :, :)

  if (present(maximum_value)) then
    m = 255
  else
    m = maximum_value
  end if
  img_shape = shape(img)
  allocate (translated(img_shape(1), img_shape(2), img_shape(3)))
  allocate (lut(0:maximum_value))

  do d = 1, img_shape(1)
    if (present(low_threshold)) then
      v_min = low_threshold
    else
      v_min = minval(img(d, :, :))
    end if
    if (present(high_threshold)) then
      v_max = high_threshold
    else
      v_max = maxval(img(d, :, :))
    end if
    do i = 0, maximum_value
      lut(i) = min(maximum_value, &
                   max(0, &
                       int(((real(i) - v_min)/(v_max - v_min))*maximum_value)))
    end do
    do w = 1, img_shape(3)
      do h = 1, img_shape(2)
        translated(d, h, w) = lut(img(d, h, w))
      end do
    end do
  end do
end function linear_translation
```

オプショナル引数の関係でごちゃごちゃしているがやっていることはv_minとv_maxが引数で与えられたらそれで置き換える処理なのでほとんど変わっていない。

カラー画像だと各チャネルごとにヒストグラムを伸ばすので思っている画像が出ないかもしれない。
