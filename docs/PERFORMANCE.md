# Performance

## Code-splitting

Some dependencies used on the site are quite heavy. To avoid bundling them with the rest of the site at the risk of not using them, they are [code-split separately with Next.js](https://nextjs.org/docs/advanced-features/dynamic-import).

Data visualization (statistics, card collection, mana curve…) is handled with the [recharts](https://recharts.org/en-US/) library, which is [very heavy](https://bundlephobia.com/package/recharts@2.1.9). Unfortunately, it is not very convenient to lazy-load. So it’s important any component that imports something from `recharts` gets lazy-loaded with Next.js. This ensures `recharts` doesn’t get bundled in the main JavaScript files.

`react-select` which is used for advanced dropdowns with autocompletion support is a rather heavy library as well, [clocking at ~26Kb minified and gzipped](https://bundlephobia.com/package/react-select@5.3.0). For that reason, it is lazy-loaded via Next.js only when used.

`html2canvas`, the library used to generate an image from a DOM node, is also very heavy [at ~46Kb minified and gzipped](https://bundlephobia.com/package/html2canvas@1.4.1). It is therefore dynamically imported when using the image export functionality in the deck builder. This way, it never gets downloaded until explicitly needed.

## Bundle analyzer

The Webpack bundle analyzer can be used locally by defining a `WEBPACK_BUNDLE_ANALYZER=1` environment variable in the `.env` file, and running `npm run build-site`. This will cause two new tabs to open in the default browser: one for client-side bundles, one for server-side bundles. Only the client-side one really matters for performance.

## Images

Images are typically lazy-loaded with the `lazy` HTML attribute so they are not blocking the critical path. Most images are hosted on the Sanity CDN, which provides a [handy URL API](https://www.sanity.io/docs/image-urls) to manipulate the image for performance benefits.

The `Image` component (and less importantly the `HeaderBanner` component) automatically adds the following query parameters:

- `auto=format` to have Sanity ship WebP (or even Avif in the future) images if the browser requesting them supports this format.
- `w=` to request the image at a specific width, infered by the `width` prop.
- `q=90` to slightly lower the image quality in order to save some data.

## Icons

Icons mainly come from the [Icomoon bank](https://icomoon.io/app) are rendered using SVG. However, [importing SVGs as JSX is damaging to performance](https://twitter.com/_developit/status/1382838799420514317?s=20&t=8Lf2K_1JzWosry5dnbwxvg). Therefore, SVG icons are compiled as a sprite (`sprite.svg`) inlined in the document, and the `Icon` component uses `<use>` to reference the correct symbol.

A couple things to note about this:

- Because SVGs are not embedded as JSX, they are not highly customizable. Their color and size can be controlled with CSS, but individual SVG children cannot be styled.
- Adding a new icon means manually updating the sprite file to add a new symbol. It can be a little inconvenient, although hopefully new icons are not added every day.
