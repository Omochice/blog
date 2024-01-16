import type { Data } from "lume/core.ts";
import { TopicButton } from "./topicButton.tsx";
import { joinUrl } from "./logics/joinUrl.ts";
import SuggestButton from "./components/suggestButton.tsx";

export const layout = "base.tsx";

const contentWidth = {
  width: "max(80%, min(100%, 1024px))",
};

export default ({ title, children, topics, page }: Data) => (
  <>
    <a href={joinUrl("/")}>&lt; Return to index</a>
    <div className="flex justify-center flex-col gap-y-4">
      <h1 className="text-5xl">
        {title}
      </h1>
      <div className="flex gap-2">
        {(topics ?? []).map((topic) => (
          <TopicButton
            topic={topic}
            key={topic}
          />
        ))}
      </div>
      <main className="overflow-ellipsis" style={contentWidth}>
        <article className="leading-loose article">{children}</article>
      </main>
      <SuggestButton path={page?.src.entry?.path ?? ""} />
    </div>
  </>
);
