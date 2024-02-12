import { stringify } from "https://deno.land/std@0.214.0/yaml/mod.ts";
import { format } from "npm:date-fns@3.3.1";
import { join } from "https://deno.land/std@0.214.0/path/mod.ts";

function generate() {
  const frontMatter = {
    layout: "zenn.tsx",
    title: "",
    topics: [],
    excerpt: "",
    type: "tech",
  };
  return ["---", stringify(frontMatter), "---"]
    .map((e) => e.trim())
    .join("\n");
}

if (import.meta.main) {
  const filename =
    [format(new Date(), "yyyy-MM-dd"), crypto.randomUUID()].join("-") +
    ".md";
  const outPath = join(Deno.cwd(), "site", "posts", filename);

  Deno.writeTextFileSync(outPath, generate(), { create: true });
  console.log(`generate template to ${outPath}`);
}
