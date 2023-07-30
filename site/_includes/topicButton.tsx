import { joinUrl } from "./logics/joinUrl.ts";

type Props = { topic: string };
export const TopicButton = ({ topic }: Props) => {
  return (
    <>
      <a
        className="bg-gray-300 rounded px-2 font-mono h-11/12 cursor-pointer text-black block w-max"
        href={joinUrl(`/tag/${topic.toLowerCase()}`)}
      >
        {topic.toLowerCase()}
      </a>
    </>
  );
};
