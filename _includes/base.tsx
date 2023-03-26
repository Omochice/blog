import { title as blogTitle } from "../_config.ts";
import type { Data } from "lume/core";
import { SharedHead } from "./components/sharedHead.tsx";
import { ZennHeader } from "./components/zennHeader.tsx";
import { PrismHighlight } from "./components/prismHighlight.tsx";
import { KatexHeader } from "./components/katexHeader.tsx";

export default ({ title, children }: Data) => (
  <>
    <html lang="ja">
      <head>
        <SharedHead />
        <ZennHeader />
        <PrismHighlight />
        <KatexHeader />
        <link rel="stylesheet" href="/assets/style.css" />
        <title>{title || blogTitle}</title>
      </head>
      <body className="p-10">{children}</body>
    </html>
  </>
);
