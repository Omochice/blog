import { SharedHead } from "./components/sharedHead.tsx";
import { ZennHeader } from "./components/zennHeader.tsx";
import { PrismHighlight } from "./components/prismHighlight.tsx"
import { KatexHeader } from "./components/katexHeader.tsx"

export default ({ title, children, type }) => (
  <>
    <html lang="ja">
      <head>
        <SharedHead />
        <ZennHeader />
        <PrismHighlight />
        <KatexHeader />
        <link rel="stylesheet" href="/assets/style.css" />
        <title>{title}</title>
      </head>
      <body className="p-10">{children}</body>
    </html>
  </>
);
