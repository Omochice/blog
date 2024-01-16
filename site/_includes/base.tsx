import type { Data } from "lume/core.ts";
import { SearchBox } from "./searchBox.tsx";

export default ({ title, children }: Data) => (
  <>
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/assets/style.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.3/dist/katex.min.css"
          integrity="sha384-Juol1FqnotbkyZUT5Z7gUPjQ9gzlwCENvUZTpQBAPxtusdwFLRy382PSDx5UUJ4/"
          crossOrigin="anonymous"
        />
        <title>{title}</title>
      </head>
      <body className="p-10">
        <SearchBox />
        {children}
      </body>
    </html>
  </>
);
