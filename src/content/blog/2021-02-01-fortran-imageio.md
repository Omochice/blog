---
title: "fortranでpnmの入出力を書く"
topics: ["fortran"]
excerpt: ""
type: tech
---

pnm には P1~P6 まで種類があるが、今回は ascii 形式の P1~P3 を対象とする。

また、`#` で始まるコメント行を読み取るのが面倒なので `sed` で処理する。

```bash
function convert_pgm() {
    filename=$1
    ext=".pgm"  # 必要に応じて拡張子は変更
    dst=${filename%.*}$ext
    tmp=".tmp"$ext
    command convert $filename -compress none $tmp
    command sed "/^#\w*/d" $tmp >$dst
    command rm $tmp
}

for arg; do
    convert_pgm $arg
done
```

これでコメントなしの P1~P3 の画像ができる。

P3 だとこんな感じのテキストデータになる。

```text
P3
3 2
255
1 1 1 2 2 2 3 3 3
100 100 100 200 200 200 255 255 255
```

- 1 行目がフォーマット
- 2 行目が width, height
- 3 行目が画素値の最大(P1 だと 2 で固定なので省略される)
- 以降画素値が RGB の順で並ぶ

## 入力

読み取って 3 次元配列を返す function を fortran で書く。

```fortran
function load_pnm(filename) result(img_array)
  !!! load_pnm
  !!!
  !!!   input:
  !!!     filename(character): input filename.
  !!!   output:
  !!!     img_array(integer, 3D): image array.
  !!!                             even if the image is grayscale/monochrome, the array is 3D.
  implicit none
  character(*), intent(in) :: filename
  integer, allocatable, dimension(:, :, :) :: img_array
  character(len=2) :: pnm_type
  integer :: i, j
  integer :: width, height, max_value, n_layer
  integer :: iostatus = 1
  integer, allocatable :: row(:), div_row(:), mod_row(:)

  open (10, file=filename, status="old", action="read", position="rewind")
  read (10, *, iostat=iostatus) pnm_type
  read (10, *, iostat=iostatus) width, height

  if (pnm_type == "P1") then
    n_layer = 1
  else if (pnm_type == "P2") then
    n_layer = 1
    read (10, *, iostat=iostatus) max_value
  else if (pnm_type == "P3") then
    n_layer = 3
    read (10, *, iostat=iostatus) max_value
  else
    print *, "pnm header must be in (P1, P2, P3), the header is ", pnm_type
    stop 1 ! how raise error?
  end if

  allocate (img_array(n_layer, height, width))

  allocate (row(width*n_layer))
  div_row = ([(i, i=0, (width*n_layer) - 1)]/n_layer) + 1 ! 1, 1, 1, 2, 2, 2, ...
  mod_row = (mod([(i, i=0, (width*n_layer) - 1)], n_layer)) + 1 ! 1, 2, 3, 1, 2, 3, ...
  do i = 1, height
    read (10, *, iostat=iostatus) row
    do j = 1, size(row)
      img_array(mod_row(j), i, div_row(j)) = row(j)
    end do
    if (iostatus < 0) then
      exit
    end if
  end do
  close (10)
  deallocate (row, div_row, mod_row)
end function load_pnm
```

この関数は P1 だろうが P2 だろうが 3 次元の配列を返す。($1\times h \times w$)

P3 の場合 RGB の順でデータが並んでいるのでそれぞれ対応したレイヤに数値を移動させるため、マスクみたいな配列 `div_row, mod_row` を作成している。

また、P1~P3 以外のデータが入ったときは `stop 1` が呼ばれ、プログラムが終了する。
Python なら `raise FormatError` とかするんだけど fortran でエラー処理が見つからなかったのでとりあえずこの形で実装した。

## 出力

出力は 2 段階に分けて処理する。

1. pnm 画像として出力
2. `display` コマンドで表示

### pnm 画像として出力

入力時と逆のことをやる。

```fortran
subroutine save_pnm(img_array, maximum_value, filename)
  !!! Save array as pnm image.
  !!\!
  !!! input:
  !!!   img_array (integer, 2D): image array. have pix value.
  !!!   maximum_value (integer): image maximum_value.
  !!!   filename (character): use as the filename of saved image.

  implicit none
  integer, dimension(:, :, :), intent(in) :: img_array
  character(len=*), intent(in) :: filename
  integer, intent(in) :: maximum_value
  character(len=2) :: header
  integer :: width, height, n_layer
  integer :: i, j
  integer, dimension(3) :: img_shape
  integer, allocatable :: row(:)

  img_shape = shape(img_array)
  n_layer = img_shape(1)
  height = img_shape(2)
  width = img_shape(3)

  if (n_layer == 3) then
    header = "P3"
  else if (n_layer == 1 .and. maximum_value /= 2) then
    header = "P2"
  else if (n_layer == 1 .and. maximum_value == 2) then
    header = "P1"
  else
    print *, "the number of leyer must be 1 or 3. the number is ", n_layer
    stop 1
  end if

  open (18, file=filename, status="replace")
  write (18, "(A)") header
  write (18, *) width, height
  write (18, *) maximum_value
  do i = 1, height
    if (n_layer == 1) then
      row = img_array(1, i, :)
    else
      row = [(img_array(1, i, j), img_array(2, i, j), img_array(3, i, j), j=1, width)]
    end if
    write (18, *) row
  end do
  close (18)
end subroutine save_pnm
```

pnm のフォーマットだけは左詰めで書かないとエラーになるため書式を設定している。
Python なら `" ".join(map(str, (width, height)))` とかで書くんだけど fortran で間空白の方法がわからないし、これで動いのたのでヨシとする。
ファイルサイズは大きくなるが、そもそもファイルサイズを気にするなら P4~P6 でいい。

### 画像の表示

fortran には matplotlib みたいに簡単に可視化できるものがなさそうなのでおとなしく `display` を使う。
`display` がない環境はそもそもに `convert` がないはずなのでここまで来る前にエラーに遭うはず。

```fortran
subroutine display_img(img, maximum_value)
  !!! Display array img.
  !!! save array as pnm image named "output.pnm" then show via imagemagick.
  !!! input:
  !!!   img (integer, 2D): have pix value.
  !!!   maximum_value (integer): image maximum_value. ex. 255

  implicit none
  integer, dimension(:, :, :), intent(in) :: img
  integer, intent(in) :: maximum_value

  call save_pnm(img, maximum_value, "output.pnm")
  call system("display output.pnm")
end subroutine display_img
```

`output.pnm` というファイルで書き出して `call system("display output.pnm")` で呼び出す。

## モジュール化

モジュール化をしないと配列サイズの取得とかが面倒なのでする。

[github](https://github.com/Omochice/image-processing/blob/main/src/pnm_tools.f90)においた。

これを `gfortran pnm_tools.f90 -c` で `.o` を作成したら次のテストプログラムが動く。

```fortran
program test_load_pnm
  use pnm_tools
  implicit none
  character(len=100) :: filename
  integer, allocatable :: img(:, :, :)
  integer :: d = 255

  call get_command_argument(1, filename)
  img = load_pnm(filename)
  call display_img(img, 255)
end program test_load_pnm
```

## 要改善点

- メモリの順序を意識しないで書いたから効率が良くない
- いちいち `display_img` に数値を渡すのがめんどくさい
  - デフォルト値を設定したい
- テストを書きたい
  - fortran のテストよくわからん
- そもそも `Imageクラス` を作ってしまって `Image.show()` とかの方が簡単なのでは？
