# Performance

## Recharts

Data visualization (statistics, card collection, mana curve…) is handled with the [recharts](https://recharts.org/en-US/) library. Unfortunately, it is not very convenient to lazy-load. So it’s important any component that imports something from `recharts` gets [lazy-loaded](https://nextjs.org/docs/advanced-features/dynamic-import) with Next.js. This ensures `recharts` doesn’t get bundled in the main JavaScript files.
