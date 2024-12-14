import { css } from "lit";
import componentStyles from "../../styles/component.styles.ts";

export default css`
   ${componentStyles}

   :host {
      display: block;
   }
   /* .theme-toggle ----------------------------------------------------- */
   .theme-toggle {
      --icon-fill: hsl(var(--text-1-hsl) / 0.5);
      --icon-fill-hover: var(--text-2);
      --size: 1.5rem;

      -webkit-tap-highlight-color: transparent;
      cursor: pointer;
      outline-offset: 5px;
      touch-action: manipulation;

      & > svg {
         block-size: var(--size);
         filter: none;
         inline-size: var(--size);
         stroke-linecap: round;
      }
   }

   /* .theme-toggle__icon ------------------------------------------------ */
   .sun-and-moon {
      & > :is(.moon, .sun, .sun-beams) {
         transform-origin: center center;
      }

      & > :is(.moon, .sun) {
         fill: var(--icon-fill);

         .theme-toggle:is(:hover, :focus-visible) > & {
               fill: var(--icon-fill-hover);
         }
      }

      & > .sun-beams {
         stroke: var(--icon-fill);
         stroke-width: 2px;

         .theme-toggle:is(:hover, :focus-visible) & {
               stroke: var(--icon-fill-hover);
         }
      }

      [color-scheme="dark"] & {
         & > .sun {
               transform: scale(1.75);
         }

         & > .sun-beams {
               opacity: 0;
         }

         & > .moon > circle {
         transform: translateX(-7px);

               @supports (cx: 1) {
                  transform: translateX(0);
                  cx: 17;
               }
         }
      }

      @media (prefers-reduced-motion: no-preference) {
         & > .sun {
               transition: transform .5s var(--ease-elastic-3);
         }

         & > .sun-beams {
               transition:
                  transform .5s var(--ease-elastic-4),
                  opacity .5s var(--ease-3)
               ;
         }

         & .moon > circle {
               transition: transform .25s var(--ease-out-5);

               @supports (cx: 1) {
                  transition: cx .25s var(--ease-out-5);
               }
         }

         [color-scheme="dark"] & {
               & > .sun {
                  transform: scale(1.75);
                  transition-timing-function: var(--ease-3);
                  transition-duration: .25s;
               }

               & > .sun-beams {
                  transform: rotateZ(-25deg);
                  transition-duration: .15s;
               }

               & > .moon > circle {
                  transition-delay: .25s;
                  transition-duration: .5s;
               }
         }
      }
   }
`;