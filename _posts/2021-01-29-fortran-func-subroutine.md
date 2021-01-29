---
layout: post
title: "fortranのfunctionとsubroutineの差異"
category: "fortran"
excerpt: ""
---

# {{ page.title }}

覚えがきで記しておく。

pythonで言うところの`list.append()`みたいな感じで引数自身が返り値の性質を持つときはsubroutineで書く方が多分それっぽくなる。

```fortran
subroutine foo(a)
  implicit none
  integer, intent(inout) :: a
  a = a**2
end subroutine foo
```

## fortran で関数を引数に取る関数を書く

これがよくわからなくてsubroutineで第2引数で出力用配列を入れてた。

functionだとこんな感じで書く。

```fortran
pure function foo(n) result(r)
  implicit none
  integer, intent(in) :: n(:)
  integer, allocatable :: r(:)
  r = n**2
end function foo
```

決定的な動作をする関数なので申し訳程度に`pure`をつけている。

フィルタリング周りをこれを使って書き直そう。
