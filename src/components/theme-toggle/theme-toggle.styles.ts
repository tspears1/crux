import { css } from "lit";
import componentStyles from "../../styles/component.styles.ts";
import { buttonReset } from "../../styles/mixins/button.mixins.ts";

export default css`
   ${componentStyles}

   :host {
      display: block;
   }

   /* .theme-toggle ----------------------------------------------------- */
   .theme-toggle {
      --_theme-toggle-size:              var(--theme-toggle-size, 1.5rem);
      --_icon-fill:                      var(--theme-toggle-icon-fill, currentColor);
      --_icon-fill-hover:                var(--theme-toggle-icon-fill-hover, currentColor);

      /* Button Reset */
      ${buttonReset()}

      -webkit-tap-highlight-color: transparent;
      cursor: pointer;
      outline-offset: 5px;
      touch-action: manipulation;

      & > svg {
         block-size: var(--_theme-toggle-size);
         filter: none;
         inline-size: var(--_theme-toggle-size);;
         stroke-linecap: round;
      }

      :is(:hover, :focus-visible) {
         .sun-and-moon > .sun-beams {
            stroke: var(--_icon-fill-hover);
         }
      }
   }

   /* .theme-toggle__icon ------------------------------------------------ */
   .sun-and-moon {
      & > :is(.moon, .sun, .sun-beams) {
         transform-origin: center center;
      }

      & > :is(.moon, .sun) {
         fill: var(--_icon-fill);

         .theme-toggle:is(:hover, :focus-visible) > & {
            fill: var(--_icon-fill-hover);
         }
      }

      & > .sun-beams {
         stroke: var(--_icon-fill);
         stroke-width: 0.125rem;
      }

      @media (prefers-reduced-motion: no-preference) {
         & > .sun {
               transition: scale 500ms var(--ease-elastic-out-3, cubic-bezier(.5, 1.25, .75, 1.25));
         }

         & > .sun-beams {
               transition:
                  rotate 500ms var(--ease-elastic-out-4, cubic-bezier(.5, 1.5, .75, 1.25)),
                  opacity 500ms var(--ease-3, cubic-bezier(.25, 0, .3, 1))
               ;
         }

         & .moon > circle {
               transition: translate 250ms var(--ease-out-5, cubic-bezier(0, 0, 0, 1));

               @supports (cx: 1) {
                  transition: cx 250ms var(--ease-out-5, cubic-bezier(0, 0, 0, 1));
               }
         }
      }
   }

   [color-scheme="dark"] {
      .sun-and-moon {
         & > .sun {
            scale: 1.75;
         }

         & > .sun-beams {
            opacity: 0;
         }

         & > .moon > circle {
            translate: -7px;

               @supports (cx: 1) {
                  translate: 0;
                  cx: 17;
               }
         }

         @media (prefers-reduced-motion: no-preference) {
            & > .sun {
               scale: 1.75;
               transition-timing-function: var(--ease-3, cubic-bezier(.25, 0, .3, 1));
               transition-duration: 250ms;
            }

            & > .sun-beams {
               rotate: z -25deg;
               transition-duration: 150ms;
            }

            & > .moon > circle {
               transition-delay: 250ms;
               transition-duration: 500ms;
            }
         }
      }
   }
`;
