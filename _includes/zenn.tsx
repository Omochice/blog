import type { ZennPageData } from "plugins/zenn-renderer/mod.ts";
import { TopicButton } from "./topicButton.tsx";
import { joinUrl } from "./logics/joinUrl.ts";

export const layout = "base.tsx";

const contentWidth = {
  width: "max(80%, min(100%, 1024px))",
};

export default ({ title, children, topics, emoji }: ZennPageData) => (
  <>
    <a href={joinUrl("/")}>&lt; Return to index</a>
    <div className="flex justify-center flex-col gap-y-4">
      <h1 className="text-5xl">
        {title} {emoji}
      </h1>
      <div>
        {(topics ?? []).map((topic) => (
          <TopicButton
            topic={topic}
            key={topic}
          />
        ))}
      </div>
      <main className="overflow-ellipsis" style={contentWidth}>
        <article className="znc leading-loose">{children}</article>
      </main>
    </div>
  </>
);
