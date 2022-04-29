# Technical debt

## Guides’ `user` key

Guides can have multiple authors, and the field that stores that data is inappropriately called `user` instead of `users`. This is just a silly mistake that I never addressed.

This is currently normalized on the API layer when querying for guides, but it should ideally be addressed via another data migration to fix the problem (exposing the value as `users`, updating the API layer, then another data migration to remove the `user` field).

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
