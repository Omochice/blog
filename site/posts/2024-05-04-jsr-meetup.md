---
title: "jsr meetup に参加した"
topics: ["deno", "event"]
excerpt: ""
type: tech
---

2024-05-03に開催されたjsr-meetupに参加しました。


[connpass]()


タイムテーブル


## jsrの概要

確かにnpmはjavascriptのレジストリとして動いているが、現在だとライブラリは大体tsで書かれるからそれをそのままuploadできるようなUXがあると嬉しい

ライブラリ書きたいねんtscの設定書きたいわけじゃないねんにはなることがあるので。。。

ただ、tsをそのままあげるという都合上、viteでトランスパイル時に定数を埋めたりすることはjsrだとできなそう


## jsrにアップロードしてみる

ライブラリとしてあって欲しいもの（documentationとか、どのruntimeをサポート対象とするかとか）をscoreという定量的なもので測れるのは良さそう。


## jsrをローカルで動かす

OSSなので手元でも動くという話。

internalなjsrを作ることもできそう？

でもpublicなjsrにあるものとinternalなjsrにあるものを両方使いたい、みたいなユースケースは動くんだろうか？

(npmだとnpmrcでレジストリ切り替えれるが...)

## deno.land/stdからjsrへの移行

deno.land/stdは0.224.0までのstdのmoduleが上がっている状態。

以降はdeno.land側の更新は止まり、jsr:@std/が更新されていくとのこと。

寝耳に水だったので急いで移行をしないと置いていかれそう。

現状のdeno用のrenovateの設定だとreplaceするruleは書いていない。

書くためにはいかが必要そう

- captureしているpackage nameを変える
  - 今だと`https://deno.land/std`をPackageNameとして取得しているので、replace側でreplaceしようにも`jsr:@std`のどのモジュールかを知ることができない
  - これはjsrに移行したタイミングで`std`というパッケージから`@std/foo`みたいな子パッケージの単位にモジュールが変わっているのが原因の一端
    - アップデートのターゲットが`std`から`@std/foo`に変えないといけない
  - 仮にcaptureできたとしてバージョンの付与位置が変わる(`std@x.x.x/foo` => `@std/foo@x.x.x`)のでここをカバーできるか?
    - ここが難しいような気がしていて、deno-graphでやった方が良さそうな気がしている
