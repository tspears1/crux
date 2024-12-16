
// Lit ====================================================================
import { html, LitElement } from "lit";
import { property, state } from "lit/decorators.js";

// Component ==============================================================
import styles from "./theme-toggle.styles.ts";

// Types ==================================================================
import type { CSSResultGroup} from "lit";

/**
 * @summary A theme toggle component to switch between light and dark mode.
 * @status stable
 * @since 1.0.0
 *
 * @slot prefix - Used to prepend a presentational icon or similar element to the button.
 * @slot suffix - Used to append a presentational icon or similar element to the button.
 *
 * @property {string} storageKey - The key to store the theme preference in localStorage.
 *
 * @csspart root - The component's root element.
 * @csspart icon - The icon container element.
 * @csspart prefix - The container that wraps the prefix slot.
 * @csspart suffix - The container that wraps the suffix slot.
 *
 * @cssvar --theme-toggle-size - The size of the toggle button.
 * @cssvar --theme-toggle-icon-fill - The fill color of the toggle button icon.
 * @cssvar --theme-toggle-icon-fill-hover - The fill color of the toggle button icon when hovered or focused.
 */
export default class ThemeToggle extends LitElement {
   static styles: CSSResultGroup = styles;

   @state()
   private accessor theme: string | 'light' | 'dark' = 'light';

   @property({ type: String})
   accessor storageKey: string = 'theme-preference';

   /**
    * Get the current color preference
    *
    * @returns {'light' | 'dark'}
    */
   getColorPreference = (): string => {
      if (localStorage.getItem(this.storageKey)) {
         return localStorage.getItem(this.storageKey) as string;
      } else {
         return matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
      }
   }

   /**
    * Set the current color preference
    * @private
    */
   setPreference = () => {
      localStorage.setItem(this.storageKey, this.theme)
      this.reflectPreference()
   }

   /**
    * Update the root element with the current theme
    * @private
    */
   reflectPreference = () => {
      document.documentElement.setAttribute('color-scheme', this.theme)
   }

   /**
    * Toggle current theme value and update preference
    * @private
    */
   handleClick = () => {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      this.setPreference()
   }

   connectedCallback() {
      super.connectedCallback()
      // set initial value
      this.theme = this.getColorPreference()

      // set early so no page flashes / CSS is made aware
      this.reflectPreference()

      globalThis
         .matchMedia('(prefers-color-scheme: dark)')
         .addEventListener('change', ({ matches: isDark }) => {
               this.theme = isDark ? 'dark' : 'light'
               this.setPreference()
         })
   }

   render() {
      return html`
         <button
            class='theme-toggle'
            part='root'
            id='theme-toggle'
            title='Toggles light & dark'
            aria-label=${ this.theme ?? 'auto' }
            aria-live='polite'
            @click=${this.handleClick}
            color-scheme=${this.theme}
         >
            <slot name='prefix' part='prefix'></slot>
            <div class='theme-toggle__icon' part='icon'>
               <svg class='sun-and-moon' aria-hidden='true' width='24' height='24' viewBox='0 0 24 24'>
                  <mask class='moon' id='moon-mask'>
                     <rect x='0' y='0' width='100%' height='100%' fill='white' />
                     <circle cx='24' cy='10' r='6' fill='black' />
                  </mask>
                  <circle class='sun' cx='12' cy='12' r='6' mask='url(#moon-mask)' fill='currentColor' />
                  <g class='sun-beams' stroke='currentColor'>
                     <line x1='12' y1='1' x2='12' y2='3' />
                     <line x1='12' y1='21' x2='12' y2='23' />
                     <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
                     <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
                     <line x1='1' y1='12' x2='3' y2='12' />
                     <line x1='21' y1='12' x2='23' y2='12' />
                     <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
                     <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
                  </g>
               </svg>
            </div>
            <slot name='suffix' part='suffix'></slot>
         </button>
      `;
   }
}