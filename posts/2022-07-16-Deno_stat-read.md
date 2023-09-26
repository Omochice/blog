---
layout: zenn.tsx
title: Deno.statのモードの読み方
topics: &ref_0
  - Deno
excerpt: ''
type: tech
author: Omochice
tags: *ref_0

---
## 要約

- `Deno.stat().mode` は 10 進数表記の実行権限を返してくる
    - これは C の `stat()` が返してくるものと同じ

## 以下、駄文

`bashrc` や `zshrc`、`config.fish` を toml から生成するプログラムを書いている。

書いている最中に `if executable("command") then ...` みたいなことを Deno 単体でやりたくなったので `Deno.stat` 使って実装しようとした。

unix 的には `"command"` が実行できるということは以下が満たされているときである。

- `$PATH.split(":").map((e) => e + "/command")` が存在
- そのファイルに実行権限がついている

ファイルの `mode` は `Deno.stat` で取得できるが、`0644` みたいな表現ではなかったので調べた結果をまとめる。

## 結果

- `Deno.statSync().mode` で得られる数値は nodejs の `fs.stat().mode` で得られるものと同じ
- `mode` の値は C の `stat()` で得られる field `st_mode` の値を 10 進数表記したもの
- `st_mode` の下 4 桁が `0644` にあたる。


よって、あるコマンドが実行可能かどうかは以下の関数で実現できる。

```typescript
function executable(command: string): boolean {
  const pathDirs = (Deno.env.get("PATH") ?? "").split(":");
  return pathDirs.some((dir: string) => {
    try {
      const mode = Deno.statSync(`${dir}/${command}`).mode;
      if (mode === null) {
        return false;
      }
      return (mode & parseInt("100", 8)) === parseInt("100", 8);
    } catch (_) {
      return false;
    }
  });
}

console.log(executable("deno"));
// true
```

とりあえず、カレントユーザが実行できるかどうかだけみたいので `100` とビット演算をしてそのフラグが立ってるかどうかを見ている。
