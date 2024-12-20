import { css } from "lit";
import componentStyles from "../../styles/component.styles.ts";

export default css`
   ${componentStyles}

   :host {
      display: block;
   }

   .button {
      --_button-background-color:         var(--button-background-color, var(--surface-3));
      --_button-border-color:             var(--button-border-color, transparent);
      --_button-border-width:             var(--button-border-width, var(--border-size-1));
      --_button-highlight-color:          var(--button-highlight-color, hsl(var(--text-1-hsl) / 0.3));
      --_button-highlight-size:           0;
      --_button-padding-block:            var(--button-padding-block, 0);
      --_button-padding-inline:           var(--button-padding-inline, var(--size-fluid-1));
      --_button-text-color:               var(--button-text-color, var(--text-1));

      background: var(--_button-background-color);
      border-radius: var(--radius-2);
      border: var(--_button-border-width) solid var(--_button-border-color);
      box-shadow: 0 0 0 var(--_button-highlight-size) var(--_button-highlight-color);
      color: var(--_button-text-color);
      display: grid;
      gap: var(--size-3);
      grid-auto-flow: column;
      margin: 0;
      padding-block: var(--_button-padding-block);
      padding-inline: var(--_button-padding-inline);
      place-content: center;

      @media (prefers-reduced-motion: no-preference) {
          transition: box-shadow var(--duration-fast) var(--ease-out-2);
      }

      @media (any-hover: hover) {
          &:hover {
              --_button-highlight-size: calc(var(--font-size-fluid-0) / 3);
              text-decoration: none;
          }
      }

      &--outline {
          --_button-background-color:     var(--button-background-color, inherit);
          --_button-border-color:         var(--button-border-color, hsl(var(--text-2-hsl) / 0.40));
          --_button-highlight-color:      var(--button-highlight-color, hsl(var(--brand-hsl) / 0.75));

          @media (prefers-reduced-motion: no-preference) {
              transition:
                  border-color var(--duration-fast) var(--ease-out-2),
                  box-shadow var(--duration-fast) var(--ease-out-2);
          }

          @media (any-hover: hover) {
              &:hover {
                  --_button-border-color: var(--_button-highlight-color);
              }
          }
      }
  }
`;
