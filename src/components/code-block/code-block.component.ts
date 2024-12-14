// Lit ====================================================================
import { html, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";
import { property, query, state } from "lit/decorators.js";

// Component ==============================================================
import styles from "./code-block.styles.ts";

// Library ================================================================
import { buildHighlighter } from "./code-block.shiki.ts";

// Internal ===============================================================
import { check, copy, icon } from "../../internal/icons.ts";
import { rgbToHex } from "../../internal/color.ts";

// Types ==================================================================
import type { CSSResultGroup} from "lit";


type Swatch = {
  color: string | undefined;
  surface: string | undefined;
}

/**
 * @summary A code block component with syntax highlighting.
 * @status stable
 * @since 1.0.0
 *
 * @slot - The default slot for the code block.
 * @property {string} language - The language of the code block.
 * @property {string} theme - The theme of the code block.
 * @property {boolean} nobadge - Whether to hide the language badge.
 *
 * @csspart root - The component's root element.
 * @csspart header - The header element.
 * @csspart inner - The inner element.
 * @csspart pre - The pre element.
 * @csspart code - The code element.
 * @csspart badge - The language badge element.
 * @csspart button - The copy button element.
 * @csspart button-icon - The copy button icon element.
 */
export default class CodeBlock extends LitElement {
  static styles: CSSResultGroup = styles;

  @query(".code-block")
  accessor codeBlock!: HTMLElement;
  @query(".code-block__inner")
  accessor content!: HTMLElement;

  @state()
  private accessor _code: string | undefined;
  @state()
  private accessor _copied: boolean = false;
  @state()
  private accessor _copyDelay: number = 1000;
  @state()
  private accessor _copyIcon: HTMLElement = icon(copy);
  @state()
  private accessor _copyMessage: string = "Copy";
  @state()
  private accessor _swatch: Swatch = { color: undefined, surface: undefined };

  @property({ type: Boolean })
  accessor nobadge = false;

  @property({ type: String })
  accessor language = "text";

  @property({ type: String })
  accessor theme = "night-owl";

  onCopy() {
    // Copy the code to the clipboard
    navigator.clipboard.writeText(this.content.innerText);

    // Update the UI
    this._copied = true;
    this._copyIcon = icon(check);
    this._copyMessage = "Copied!";

    // Reset the UI after a delay
    setTimeout(() => {
      this._copied = false;
      this._copyIcon = icon(copy);
      this._copyMessage = "Copy";
    }, this._copyDelay);
  }

  updateTheme() {
    const preElement = this.shadowRoot?.querySelector("pre");
    if (!preElement) return;
    this._swatch = {
      color: rgbToHex(getComputedStyle(preElement)?.getPropertyValue("color")),
      surface: rgbToHex(
        getComputedStyle(preElement)?.getPropertyValue("background-color"),
      ),
    };
    for (const [key, value] of Object.entries(this._swatch)) {
      if (!value) continue;
      this.codeBlock.style.setProperty(`--code-block-${key}`, value);
    }
  }

  async firstUpdated() {
    const slot = this.shadowRoot?.querySelector("slot");
    const slotNodes = slot?.assignedNodes({ flatten: true }) ?? [];
    if (!slotNodes.length) return;
    const highlighter = await buildHighlighter();
    this._code = highlighter.codeToHtml(
      slotNodes.map((node) => node.textContent).join("\n"),
      {
        lang: this.language,
        theme: this.theme,
      },
    );
    if (!this._code) return;
    this.content.innerHTML = this._code;
    this.updateTheme();
  }

  languageBadge() {
    if (this.nobadge) return;
    return html`
          <span class="code-block__lang" part="badge">${this.language}</span>
    `;
  }

  copyButton() {
    return html`
      <button
        class="code-block__copy ${classMap({ "code-block__copy--copied": this._copied })}"
        @click=${this.onCopy}
        aria-label="Copy code to clipboard"
        part="button"
      >
        <span class="code-block__text" part="button-text">${this._copyMessage}</span>
        <span class="code-block__icon" part="button-icon">${this._copyIcon}</span>
      </button>
    `;
  }

  render() {
    return html`
      <div class="code-block" part="root">
        <div class="code-block__header" part="header">
          ${this.languageBadge()}
          ${this.copyButton()}
        </div>
        <div class="code-block__inner" part="inner">
            <pre part="pre">
              <code part="code">
                  <slot></slot>
              </code>
            </pre>
        </div>
      </div>
    `;
  }
}
