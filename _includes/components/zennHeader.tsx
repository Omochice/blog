import { KatexHeader } from "./katexHeader.tsx";

export function ZennHeader() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://esm.sh/zenn-content-css@0.1.134?css"
      />
      <script src="https://embed.zenn.studio/js/listen-embed-event.js" />
      <KatexHeader />
    </>
  );
}
