---
layout: zenn.tsx
title: dps-codic-vimをdenopsの更新に合わせてアップデートした
topics: &ref_0
  - vim
excerpt: ''
type: tech
author: Omochice
tags: *ref_0

---
以前に denops を使ってプラグインを書いたときから時間が経って denops 本体のアップデートがあったので自作のプラグインの更新作業をした。

更新点をまとめておく。

- ### 読み込むモジュールが変わった

```diff
- import { main } from "https://deno.land/x/denops_std@v0.8/mod.ts";
+ import { Denops } from "https://deno.land/x/denops_std@v1.0.0-alpha.0/mod.ts";
+ import { execute } from "https://deno.land/x/denops_std@v1.0.0-alpha.0/helper/mod.ts";
```

- ### メイン実行部分が変わった

```diff
- main(async ({ vim  })) => {
-   vim.register({
-       async codic(args: unknown): Promise<void> {
+ export async function main(denops: Denops): Promise<void>{
+   denops.dispatcher = {
+     async codicVim(args: unknown): Promise<void>{
```

- ### `execute` の方法が変わった

```diff
- await vim.execute(`
+ await execute(
+   denops,
```

だったり、

```diff
- await vim.execute(`
-   command! -nargs=? -bar Codic call denops#request('${vim.name}', 'codic', [<q-args>])
- `);
+ };
+ await denops.cmd(
+   `command! -nargs=? -bar Codic call denops#request("${denops.name}", "codicVim", [<q-args>])`,
+ );
```

denops 側で変わった部分は以上。

ついでにリファクタリングをした。

- 関数名の変更
  `fetchAPI` だと曖昧で情報が少ないので `codic` に変更した。
  合わせて、`main` の中にいた `codic` は `codicVim` に変更した。
- 変数の命名変更
  `BASEURL` だったり `TOKEN` だった部分を camelCase に変更した。
  定数なので UPPERCASE にしていたが、`const` なので case で区別する必要はなさそう。

deno というか typescript 自体の知識が足りてないから引数の型をうまく書けない。
とりあえず `Any` で linter を黙らせたけど直さなきゃいけない。
