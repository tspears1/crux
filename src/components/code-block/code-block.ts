// deno-lint-ignore-file no-window
import CodeBlock from "./code-block.component.ts";

export * from "./code-block.component.ts";
export default CodeBlock;

window.customElements.define("code-block", CodeBlock);
