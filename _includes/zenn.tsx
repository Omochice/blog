import type { ZennPageData } from "plugins/zenn-renderer/mod.ts";

export const layout = "base.tsx";

const contentWidth = {
  width: "max(80%, min(100%, 1024px))",
}

export default ({ title, children, topics, emoji }: ZennPageData) => (
  <>
    <h1>
      {title} {emoji}
    </h1>
    <div className="flex justify-center">
      <main className="overflow-ellipsis" style={contentWidth}>
        {(topics ?? []).map((value) => <div>{value}</div>)}
        <article className="znc">{children}</article>
      </main>
    </div>
  </>
);
