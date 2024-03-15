import { join } from "https://deno.land/std@0.220.1/url/join.ts";

const classNames = [
  "bg-gray-300",
  "hover:bg-gray-400",
  "text-gray-800",
  "text-sm",
  "font-bold",
  "py-2",
  "px-4",
  "rounded",
  "inline-block",
  "items-center",
  "w-fit",
] as const;

type Prop = { path: string };

const SuggestButton = (prop: Prop) => {
  const url = new URL(join(
    "https://github.com",
    "Omochice",
    "blog",
    "blob",
    "main",
    "site",
    prop.path,
  ));
  return (
    <>
      <a
        href={url.href}
        className={classNames.join(" ")}
      >
        編集を提案
      </a>
    </>
  );
};

export default SuggestButton;
