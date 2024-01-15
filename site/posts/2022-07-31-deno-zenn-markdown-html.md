---
title: "denoでzenn-markdown-htmlを使う"
topics: ["deno"]
excerpt: ""
type: tech
---

## 要約

以下を実行


```typescript
import { extract } from "https://deno.land/std@0.150.0/encoding/front_matter.ts";
import zennMarkdownHtml from 'https://esm.sh/zenn-markdown-html?bundle';

const md = Deno.readTextFileSync("<markdown file>")

const {body, attrs} = extract(md)
const html = zennMarkdownHtml(body)

console.log(attrs)
console.log(html)
```


## 経緯

長らくdenoで[zenn-markdown-html](https://github.com/zenn-dev/zenn-editor/tree/canary/packages/zenn-markdown-html)を動かそうとしてたのがやっと成功したのでまとめる。


もともとnode.js用のライブラリなのでskypackやesm.shを経由して読み込まないといけない。

それぞれ以下のように書いたが、エラーが出た。

- skypack
    ```typescript
    import zennMarkdownHtml from 'https://cdn.skypack.dev/zenn-markdown-html';

    const md = `
    # title

    *bold*
    `

    console.log(zennMarkdownHtml(md))
    ```

    ```console
    error: Uncaught Error: This is not a web-friendly file type and cannot be imported. (Imported by "markdown-it").
    throw new Error("This is not a web-friendly file type and cannot be imported. (Imported by \"markdown-it\").");
          ^
        at https://cdn.skypack.dev/error/type:entities?specifier=entities%2Flib%2Fmaps%2Fentities.json&type=ASSET&from=markdown-it:12:7
    ```
- esm.sh
    ```typescript 

    import zennMarkdownHtml from 'https://esm.sh/zenn-markdown-html';

    const md = `
    # title

    *bold*
    `

    console.log(zennMarkdownHtml(md))
    ```

    ```console
    error: Uncaught ReferenceError: Prism is not defined
        at https://esm.sh/v89/prismjs@1.28.0/deno/components/prism-velocity.js:2:1762
        at https://esm.sh/v89/prismjs@1.28.0/deno/components/prism-velocity.js:2:203
        at https://esm.sh/v89/prismjs@1.28.0/deno/components/prism-velocity.js:2:1779
    ```


skypackのエラーはこちら側でなんともできなそうに見えるのでesm.shで読み込めないか試してみる。

zenn-markdown-contentはpackage.jsonでprism.jsを読み込むようにされているはずなのでesm.sh側でうまく処理できていないみたい。

prism.js自体はdenoでも読み込める。

```typescript
import Prism from "https://esm.sh/prismjs"

const code = "var data = 1;"

const html = Prism.highlight(code, Prism.languages.javascript, "jacascript")

console.log(html)
```


esm.shのドキュメントを読むとクエリパラメータでオプションを指定できるみたい。


> `import { Button } from "https://esm.sh/antd?bundle"`
> In bundle mode, all dependencies will be bundled into a single JS file.

依存ファイルを1ファイルにまとめてよみこんでくれるみたいなのでこれを使ってみる。
prism.jsがesm.shから見えていないならこれでもエラーが出てくるはず。


```typescript
import zennMarkdownHtml from 'https://esm.sh/zenn-markdown-html?bundle';

const md = `
# title

*bold*
`

console.log(zennMarkdownHtml(md))
```

```console
<h1 id="title"><a class="header-anchor-link" href="#title" aria-hidden="true"></a> title</h1>
<p><em>bold</em></p>
```

動いた。


元のエラーがなぜ出るのかよくわからなかったが、依存パッケージの読み込みでうまくいかなかったら`?bundle`をすればよさそう。

