---
title: "Pythonの二次元配列の初期化の速度"
topics: ["Python"]
excerpt: ""
type: tech
---

簡単なアライメントのプログラムを書いた。

その中で次のような 2 次元配列を作りたかったが、方法が 2 種類思いついたのでそれぞれの速度を調べたので記録する。
```python
[0, 1, 2, 3, 4, 5]
[1, 0, 0, 0, 0, 0]
[2, 0, 0, 0, 0, 0]
[3, 0, 0, 0, 0, 0]
[4, 0, 0, 0, 0, 0]
[5, 0, 0, 0, 0, 0]
```

`[1][1]` 以降は後の処理で書き換えていくので値は何でもいい。
（強いて言うなら型が混在してるとなんか嫌なので 0 で初期化すべき？）

## 思いついた方法

1. 初期化時点で値を入れる
    ```python
    table = [[i+j for i in range(100)] for j in range(100)]
    ```
    リスト内包表記を 2 回使う。
    ```python
    [0, 1, 2, 3]
    [1, 2, 3, 4]
    [2, 3, 4, 5]
    [3, 4, 5, 6]
    ```
    みたいな配列ができる。
    前述の通り `[1][1]` 以降は後で上書きされるので値は何でもいい。

2. 0 埋めした配列を作って必要部分を置き換える
    ```python
    table = [[0] * 100 for _ in range(100)]
    for i in range(100):
        table[0][i] = i
        table[i][0] = i
    ```
    同じ値での初期化はこの方法が早いらしい[参考](https://www.kumilog.net/entry/python-speed-comp)
    ゼロ埋めしてから必要部分を置き換えるので別途ループを書かなければいけない。


この 2 つを速度比較した。
使ったコードは以下の通り。
```python
from time import time

start = time()
for _ in range(10000):
    dp = [[i + j for i in range(100)] for j in range(100)]

process_time = time() - start

print(process_time, process_time / 10000)

start = time()

for _ in range(10000):
    dp = [[0] * 100 for _ in range(100)]
    for i in range(100):
        dp[0][i] = i
        dp[i][0] = i

process_time = time() - start

print(process_time, process_time / 10000)
```

結果は以下の通り。

```
6.415856122970581 0.0006415856122970581
0.7146909236907959 7.146909236907959e-05
```

$10^3$程度のサイズであれば個々の要素へのアクセスよりも配列の宣言のコストが大きいことがわかった。


