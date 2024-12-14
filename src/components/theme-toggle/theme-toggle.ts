// deno-lint-ignore-file no-window
import ThemeToggle from "./theme-toggle.component.ts";

export * from "./theme-toggle.component.ts";
export default ThemeToggle;

window.customElements.define("theme-toggle", ThemeToggle);
