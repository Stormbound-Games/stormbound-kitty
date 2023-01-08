# Known Issues

## Deck embed naming

Featured decks use the `deck` name as a document type, which is a tad too generic and should have been called `featuredDeck` instead. This caused deck embeds to be called `deckEmbed` when no other embed has the “embed” suffix. Not dramatic, but not incredibly consistent.

## Greedy routing

The battle simulator, deck builder, list builder, card builder and quest builder all use an [optional catch-all route](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes) (i.e. `[[...id]]`) — not very elegant and comes with a bit of additional complexity.

The reason they rely on an optional path like this instead of exposing the same component over several routes (e.g. `/deck`, `/deck/:id` and `/deck/:id/detail`) is because switching from the root path (e.g. `/deck`) to a path with an id (e.g. `/deck/n1`) would cause a change of route. This would translate in data fetching, a complete re-render and a loss of focus. The experience would be super degraded on that first action, so it’s better this way.

## Sagas

Stories that belong to the same saga are loosely grouped and ordered based on their category and the number they contain in their title. It’s fragile and requires dirty sorting.

This has been okay so far because there are only two sagas (Eastern Heat and March of Fauns) but it should probably be revisited to be more explicit if more sagas end up being added.

## Discord storage

Trivia scores and game IDs recorded via the Discord bot are stored on a free jsonbin.org storage, which has proven to be relatively unreliable over the years. It’s provided as-is and with no warranty of any kind, so it sometimes goes down and might be removed entirely at some point.

It might be worth investigating and investing in a more robust storage solution that can support many quick read/write operations, since it’s all operated via a Discord bot.

## Interface sizing

I went to great lengths to make cards and decks look as close as possible to the way they do within the game. This is important for the site to look authentic and enjoyable to use.

To do so, I wrote a React hook (`useFluidSizing`) that sets the right font size based on the width of the card/deck, so they look good at any size or in any context. There are two caveats to this:

- The resizing is visible because the server sends an approximate font size (which is often inaccurate), then the client loads and resizes the font within cards and decks to make them perfect. This little “flash” can be a little distracting but is unfortunately unavoidable.
- I cannot remember for the life of me how I came up with the magic numbers passed to the `useFluidSizing` hook (e.g. `0.03902439024`). I _think_ the given value is the ratio between the expected font size and the width of the interface element.

## Heavy pages

The data sent from the server to the client is quite heavy, regardless of which page you check. That’s because the whole card collection is _always_ fetched and passed down in the React context. Cards are used all over the place, and one way or another, every page needs access to the card collection.

This adds an extra ~80Kb on the initial payload, which is certainly not great but kind of unavoidable.

## Jest parallelization

The unit test runner (Jest) runs on a single worker (via [`--runInBand`](https://jestjs.io/docs/cli#--runinband)) because there is no way to define per-worker setup code (see [related issue](https://github.com/facebook/jest/issues/8708)). This causes unit tests to be a little slower than they could theoretically be.

What I believe happens is that one of the workers executes the global setup (`jestSetup/globalSetup.js`) which exposes the CMS data as global variables. At the same time, other workers start loading some test files and use the global data to moch some API helpers (`jestSetup/setupFilesAfterEnv.js`). Unfortunately at this stage the global data may or may not be ready. I am unsure why Jest is designed this way.

## Discord bot pre-script

To avoid having to rely on [module-alias](https://github.com/ilearnio/module-alias) for aliased paths, the project uses [native import mapping](https://github.com/ilearnio/module-alias/issues/113). With some configuration, this enables Next.js, Jest, Node scripts and the Discord bot to all understand aliased paths.

For `import` and `export` to be understood on all contexts, we used to rely on [esm](https://github.com/standard-things/esm) when executing the bot script. Unfortunately that dependency is outdated, unmaintained and doesn’t play well with newer features from the language.

The native way to add support for `import` and `export` is to use `.mjs` files or to set `"type": "module"` in the package.json. Unfortunately both options cause problems with Next.js, which inherently uses CommonJS. Therefore, the bot script automatically injects `"type": "module"` onto the package.json before starting so its context is ESM.

To prevent risking committing that modification when running the bot locally, a pre-commit hook checks the package.json to make sure it doesn’t contain that property. If it does, it blocks the commit with an error.

## Token cards

The concept of token cards on the site is a bit more complicated than it is in the game.

In Stormbound, a card is either “collectable” or not. Most cards are collectable, which means that can be found in books, crafted, and so on. However, there is no difference in logic between these cards and regular cards. That means if such a card (e.g. Qordia’s Nest) was to be put in a player’s hand, they could simply use it.

These cards are called “token” cards on the site (`token = !collectable` essentially). But the site also has a concept of “pure tokens” for non-collectable cards that do not have a concept of static stats and leveling (e.g. Token Construct). These cards have a `withoutLevel` boolean property, and are handled differently in some instances. For instance, they do not have an official card page (since it would not make sense), and they are serialized a little differently (`1T4` means 1-strength Token Pirate; `25t4` means 25-strength Token Pirate).
