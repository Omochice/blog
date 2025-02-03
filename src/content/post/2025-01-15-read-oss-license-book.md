---
title: "'OSSライセンスの教科書'を読んだが悩みが解決しなかった"
date: 2025-02-03
topics: ["book"]
excerpt: ''
type: tech
---

[OSSライセンスの教科書](https://gihyo.jp/book/2018/978-4-297-10035-3)を読んだ。

メモは例のごとく[gist](https://gist.github.com/Omochice/066293acee95ed8c69085f343b286f68)にある。

(gistに置くのどうなんだという気持ちもあるが、いい方法が思いつかない)

ライセンスの種類とか特徴はある程度知っていたので、その点での目新しさはなかった。

職業プログラマでどうOSSを使うか、という観点の本だったように思える。

個人的には以下を明らかにしたかったが、解決しなかった。

たとえば、typescriptでなんらかのエンドユーザ向けのアプリケーションを作ったとする。

そのアプリでは`enum`が使われているとする。

そうするとjsへのtranspile時に`enum`がjsで動くようにtypescript由来のコードに置き換えられる。

これは頒布にあたるのだろうか？

世の中の商用アプリの類を見るとReactとかは書いてあることが多いが、typescriptを書いているものはほぼ見たことがない。

なんらかのツールを使用して生成されたものがその変換ツールのライセンスに影響を受けるのであれば、typescriptも記載されるべきなのではないだろうか？

本のなかにもgccはそこについての特筆事項があると書かれていた。

> When you use GCC to compile a program, GCC may combine portions of
certain GCC header files and runtime libraries with the compiled
program. The purpose of this Exception is to allow compilation of
non-GPL (including proprietary) programs to use, in this way, the
header files and runtime libraries covered by this Exception.

https://gcc.gnu.org/onlinedocs/libstdc++/manual/license.html

typescriptはただのapache2だったのでgccのような文言はなかった。

(単純に見つけられてないだけで、どこかにあるのかもしれないが)

https://github.com/microsoft/TypeScript/blob/739d729ecce60771c23723aad932ab35a34df82d/LICENSE.txt#L1

> なんらかのツールを使用して生成されたものがその変換ツールのライセンスに影響を受ける

が正だとするのであれば、bunderやlinterなど単純なコードの整形の領域を越えて、なんらかの変換をしているものは全て`dependencies`ではなくて`devDependencies`に書くべきなのだろうか？

全然わからない。
