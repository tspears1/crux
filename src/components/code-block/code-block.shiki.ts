import { createHighlighterCore } from "shiki/core";
import { createOnigurumaEngine } from "shiki/engine/oniguruma";

import nightOwl from "shiki/themes/night-owl.mjs";

const buildHighlighter = async () => {
  const highlighter = await createHighlighterCore({
    themes: [nightOwl],
    langs: [
      import("shiki/langs/javascript.mjs"),
      import("shiki/langs/typescript.mjs"),
      import("shiki/langs/css.mjs"),
      import("shiki/langs/scss.mjs"),
      import("shiki/langs/html.mjs"),
      import("shiki/langs/markdown.mjs"),
      import("shiki/langs/json.mjs"),
      import("shiki/langs/bash.mjs"),
    ],
    engine: createOnigurumaEngine(import("shiki/wasm")),
  });

  return highlighter;
};

export { buildHighlighter };
