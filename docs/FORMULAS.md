# Formulas

To generate a PNG image of a mathjax formula, use the `generateFormulaImage` helper in a Node script like illustrated below.

```js
import path from 'path'
import generateFormulaImage from './bin/generateFormulaImage.mjs'

const formula = 'f(w) = ⌊ w × 1.6 + 1'
const output = path.resolve('./drawing_formula.png')

generateFormulaImage(formula, output)
  .then(() => console.log(formula, 'written at', output))
  .catch(error => console.error('Failure', error))
```

Then execute it as such with Node 16 and npm 8 (be sure to make it a `.mjs` file):

```sh
node path/to/formula/script.mjs
```

Existing formulas:

| Name | Formula | Image |
| :-- | :-- | :-- |
| Hero Score | `S'_A = S_A + K * (W - \\frac{1}{1+10^{(S_B-S_A)/400}})` | ![](https://stormbound-kitty.com/assets/images/formulas/hero.png) |
| Card Value | `v(c) = s / m * f` | ![](https://stormbound-kitty.com/assets/images/formulas/value.png) |
| Drawing Odds | `f(w) = ⌊ w × 1.6 + 1` | ![](https://stormbound-kitty.com/assets/images/formulas/drawing.png) |
