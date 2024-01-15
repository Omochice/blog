---
title: "bashのソースにおけるifと&&の速度比較"
topics: ["bash"]
excerpt: ""
type: tech
---

## 結論

`&&` のほうが若干速く見える。

## 内容

自分用に `toml` で `path` や `alias` を管理するツールを書いている。

ツール自身はシェルスクリプトを吐き出して `> ~/.bash_profile` のように扱うことを想定して作っている。

toml ファイルを見ればわかるので吐き出されるシェルスクリプトはできるだけ実行速度が早いものになって欲しい。

ここで、一般に*あるディレクトリが存在したらそれをPATHに追加する*のようなコードを bash で書くと以下のようになる。

```bash
if [[ -d $dir ]]; then
    export PATH=$dir:PATH
fi
```

```bash
[[ -d $dir ]] && export PATH=$dir:PATH
```

この 2 つを比較したときに、どっちが速くなるかを検証する。

方法は `hyperfine` を使って平均処理時間が短い方を速いとする。

計測コードはそれぞれ以下の通り。

```bash
if [[ -d /tmp ]]; then
    true
fi
```

を 10000 回書き連ねた物。


```bash
[[ -d /tmp ]] && true
```

を 10000 回書き連ねた物。


計測は以下のコマンドで実行する。

```console
$ hyperfine --warmup 3 "bash ./sample.bash" "bash ./sample2.bash"
```

それぞれ `sample.bash` が `if`、`sample2.bash` が `&&` のものとなっている。


結果は以下の通り。

```text
Benchmark 1: bash ./sample.bash
  Time (mean ± σ):      32.1 ms ±   1.2 ms    [User: 28.6 ms, System: 3.4 ms]
  Range (min … max):    30.1 ms …  36.4 ms    90 runs
 
Benchmark 2: bash ./sample2.bash
  Time (mean ± σ):      26.2 ms ±   0.9 ms    [User: 22.9 ms, System: 3.3 ms]
  Range (min … max):    24.3 ms …  28.7 ms    113 runs
 
Summary
  'bash ./sample2.bash' ran
    1.23 ± 0.06 times faster than 'bash ./sample.bash'
```

よって、`&&` のほうが若干速いということがわかった。

### 考察

やはり行数が少ないと速いのだろうか？

`if` を以下のように書き換える。

```bash
if [[ -d /tmp ]]; then true; fi
```

これで計測をした結果は以下の通り。

```text
Benchmark 1: bash ./sample.bash
  Time (mean ± σ):      30.9 ms ±   0.9 ms    [User: 27.3 ms, System: 3.6 ms]
  Range (min … max):    29.6 ms …  33.7 ms    88 runs
 
Benchmark 2: bash ./sample2.bash
  Time (mean ± σ):      26.5 ms ±   0.9 ms    [User: 23.3 ms, System: 3.2 ms]
  Range (min … max):    25.0 ms …  29.9 ms    111 runs
 
Summary
  'bash ./sample2.bash' ran
    1.17 ± 0.05 times faster than 'bash ./sample.bash'
```

これでも `&&` のほうが速かった。
