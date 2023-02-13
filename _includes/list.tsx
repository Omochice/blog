import { SharedHead } from "./components/sharedHead.tsx";

export default ({ title, children, type }) => (
  <>
    <html lang="ja">
      <head>
        <SharedHead />
        <title>{title}</title>
      </head>
      <body>{children}</body>
    </html>
  </>
);
