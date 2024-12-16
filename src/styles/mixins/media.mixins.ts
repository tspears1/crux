import { css, unsafeCSS } from "lit";

const imageFit = (fit = 'cover', position: boolean | string = false) => {
   let output = css`
      block-size: 100%;
      inline-size: 100%;
      object-fit: ${unsafeCSS(fit)};
   `
   if (position) {
      output = css`
         ${output}
         object-position: ${unsafeCSS(position)};
      `
   }

   return output;
}

export { imageFit };