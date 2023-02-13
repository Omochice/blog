import { SharedHead } from "./components/sharedHead.tsx";
import { ZennHeader } from "./components/zennHeader.tsx";

const rootCss = {
  // fontSize: "30px"
}

export default ({ title, children, type }) => (
  <>
    <html lang="ja" style={ rootCss }>
      <head>
        <SharedHead />
        <ZennHeader />
        <title>{title}</title>
      </head>
      <body className="p-10" style={ rootCss }>{children}</body>
    </html>
  </>
);
