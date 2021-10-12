---
layout: post
title: "pagicをちょっと触ってみた"
category: "deno"
excerpt: ""
---

# {{ page.title }}

Deno製の静的サイトジェネレーターの[pagic](https://github.com/xcatliu/pagic)を少し触ってみたので感想を書く。

もろもろの設定は`pagic.config.ts`または`pagic.config.tsx`に書く。

詳しいドキュメントは[公式のページ](https://pagic.org/docs/introduction.html)にまとまっているため、これを読みながら設定すればつまづくことはないと思われる。

微妙だなと思う部分としてサイトを生成したあと、そのページにアクセスするリンクを`nav`などで作るときのパスの指定がある。
例えば`/foo.html`にアクセスする場合には次のように書く。

```typescript
export default {
  nav: [
    {
      text: "foo page",
      link: "/foo.html",
    },
  ]
} 
```

これを`/foo`でアクセスできるようにするにはプロジェクト配下に`/foo/README.md`を作った上で次のように書く。

```typescript
export default {
  nav: [
    {
      text: "foo page",
      link: "/foo",
    },
  ]
}
```

`README.md`を`index.html`にリネームして生成するようだ。

テーマが調べた限り公式のものしか無いようだ。(GitHubで検索してもGitHub *pages*に引っかかってうまく検索ができない)
そのあたりはまだプロジェクトが若いので今後に期待か。

あと、個人的に`pagic --version`でバージョン情報が出てこないのが若干嬉しくない。

Denoの静的サイトジェネレータは他には[lume](https://github.com/lumeland/lume)があるのでそれも試して比較しようと思う。
