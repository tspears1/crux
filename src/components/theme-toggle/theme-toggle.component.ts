
// Lit ====================================================================
import { html, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { property, query, state } from "lit/decorators.js";

// Component ==============================================================
import styles from "./theme-toggle.styles.ts";

// Types ==================================================================
import type { CSSResultGroup} from "lit";

/**
 * @summary A theme toggle component to switch between light and dark mode.
 * @status stable
 * @since 1.0.0
 *
 * @csspart root - The component's root element.
 * @csspart icon - The icon element.
 */
export default class ThemeToggle extends LitElement {
   static styles: CSSResultGroup = styles;
}