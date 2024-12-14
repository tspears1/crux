import { css } from "lit";
import componentStyles from "../../styles/component.styles.ts";

export default css`
	${componentStyles}

	:host {
      display: block;
      transform: translateZ(0);
   }

   .code-block {
      --_block-size: var(--code-block-block-size, auto);
      --_color: var(--code-block-color, hsl(0 0% 100%));
      --_font-size: var(--code-block-font-size, 1rem);
      --_font: var(--code-block-font, var(--font-mono));
      --_padding-block: var(--code-block-padding-block, 2.5rem 2rem);
      --_padding-inline: var(--code-block-padding-inline, 2rem);
      --_radius: var(--code-block-radius, 0.25rem);
      --_surface: var(--code-block-surface, hsl(0 0% 20%));
      --_tracking: var(--code-block-letter-spacing, 0.05em);

      border: 1px solid var(--_color);
      block-size: var(--_block-size);
      overflow: scroll;
   }

   .code-block__header {
      align-items: start;
      background: var(--_surface);
      border: 1px solid var(--_color);
      display: grid;
      grid-template-columns: auto max-content;
      inset: 0 0 auto;
      justify-content: space-between;
      position: fixed;
      z-index: 3;
   }

   .code-block__lang {
      color: var(--_color);
      content: attr(data-lang);
      font-family: var(--_font);
      font-size: 0.625em;
      font-weight: 700;
      grid-column: 1 / span 1;
      letter-spacing: var(--_tracking);
      line-height: 1;
      padding: 1.5em 1.25em;
      text-transform: uppercase;
      z-index: 1;
   }

   .code-block__copy {
      background: var(--_surface);
      block-size: 100%;
      border-block: none;
      border-inline-start: 1px solid var(--_color);
      border-inline-end: none;
      color: var(--_color);
      display: grid;
      gap: 0.5em;
      grid-column: 2 / span 1;
      grid-template-columns: auto max-content;
      margin: 0;
      padding: 0.5em;
      place-content: center;
      position: relative;

      &:hover,
      &:focus-visible {
         cursor: pointer;

         &::before {
            scale: 1.2;
         }
      }
   }

   .code-block__icon {
      aspect-ratio: 1;
      block-size: 1rem;
      display: block;
      inline-size: 1rem;

      svg {
         block-size: 100%;
         inline-size: 100%;
         object-fit: contain;
      }
   }

   :where(pre, code) {
      direction: ltr;
      text-align: start;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      word-wrap: normal;
      -moz-tab-size: 4;
      -o-tab-size: 4;
      tab-size: 4;
      -webkit-hyphens: none;
      -moz-hyphens: none;
      -ms-hyphens: none;
      hyphens: none;
   }

   :where(code) {
      background: var(--_surface);
      border-radius: var(--_radius);
      color: var(--_color);
      font-family: var(--_font);
      font-size: var(--_font-size);
      letter-spacing: var(--_tracking);
   }

   :where(pre) {
      background: var(--_surface);
      border-radius: var(--_radius);
      display: flex;
      inline-size: 100%;
      margin: 0;
      overflow: hidden;
      padding: var(--_padding-block) 0;
      position: relative;

      &::after {
         background-image:
            linear-gradient(90deg, var(--_surface) 0%, transparent calc(1em + var(--_padding-inline))),
            linear-gradient(270deg, var(--_surface) 0%, transparent calc(1em + var(--_padding-inline)));
         content: "";
         inset: 0;
         pointer-events: none;
         position: absolute;
         z-index: 2;
      }

      & :where(code) {
         background: none;
         border-radius: 0;
         overflow-x: auto;
      }
   }
`;
