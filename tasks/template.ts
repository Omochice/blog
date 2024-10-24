import { stringify } from "jsr:@std/yaml@1.0.5";
import { format } from "npm:date-fns@4.1.0";
import { join } from "jsr:@std/path@1.0.7";

function generate() {
  const frontMatter = {
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
