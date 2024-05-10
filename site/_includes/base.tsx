import type { Data } from "lume/core/file.ts";
import { SearchBox } from "./searchBox.tsx";

const contentWidth = {
  maxWidth: "800px",
};

export default ({ title, children, blogTitle }: Data) => (
  <>
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <link rel="stylesheet" href="/assets/style.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.3/dist/katex.min.css"
          integrity="sha384-Juol1FqnotbkyZUT5Z7gUPjQ9gzlwCENvUZTpQBAPxtusdwFLRy382PSDx5UUJ4/"
          crossOrigin="anonymous"
        />
        <title>{title}</title>
        <link
          rel="alternate"
          href="/feed.xml"
          type="application/atom+xml"
          title={blogTitle}
        />
        <link
          rel="alternate"
          href="/feed.json"
          type="application/json"
          title={blogTitle}
        />
      </head>
      <body className="p-10">
        <header></header>
        <main class="mx-auto my-0" style={contentWidth}>
          <SearchBox />
          {children}
        </main>
        <footer></footer>
      </body>
    </html>
  </>
);
