---
title: fortranのfunctionとsubroutineの差異
topics: &ref_0
  - fortran
excerpt: ''
type: tech
author: Omochice
tags: *ref_0

---
# {{ page.title }}

覚えがきで記しておく。

Python で言うところの `list.append()` みたいな感じで引数自身が返り値の性質を持つときは subroutine で書く方が多分それっぽくなる。

```fortran
subroutine foo(a)
  implicit none
  integer, intent(inout) :: a
  a = a**2
end subroutine foo
```

## fortran で関数を引数に取る関数を書く

これがよくわからなくて subroutine で第 2 引数で出力用配列を入れてた。

function だとこんな感じで書く。

```fortran
pure function foo(n) result(r)
  implicit none
  integer, intent(in) :: n(:)
  integer, allocatable :: r(:)
  r = n**2
end function foo
```

決定的な動作をする関数なので申し訳程度に `pure` をつけている。

フィルタリング周りをこれを使って書き直そう。
