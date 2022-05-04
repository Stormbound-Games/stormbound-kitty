# Game Overlap

Given Stormbound does not expose a public API, there is only minimal overlap between the game and the site.

## Deck IDs

The site has had unique deck IDs since March 2019, while Stormbound only added deck IDs in November 2021. For that reason, they are quite different. Most notably:

- Stormbound deck IDs do not contain card levels because it automatically adjust to the player’s collection.
- Stormbound-Kitty deck IDs are designed for conciseness. A deck can be serialized in 30–40 characters, including card levels. Stormbound deck IDs being base64-encoded, they end up being very long.
- Both systems rely on different card identifiers.

The deck builder does provide a way to get (and copy to clipboard) the Stormbound deck ID of a given deck. This way a deck can be made on the site and copied to the game. Similarly, Stormbound deck IDs are supported by the deck builder and decoded properly.
