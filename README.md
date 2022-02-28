# Stormbound-Kitty

Source code for [Stormbound-Kitty](https://stormbound-kitty.com/).

## Documentation

- [Update the equals list](./docs/UPDATING_EQUALS_LIST.md)

## Development

The site runs with [Next](https://nextjs.org/). Therefore, it uses Node.js (version 14). It is recommended to install [nvm](https://github.com/nvm-sh/nvm) (or [nvm-windows](https://github.com/coreybutler/nvm-windows)) to manage Node versions, but it’s not mandatory, as long as Node 14 is installed on the machine.

Then run the following commands to install the local dependencies and start the development server:

```
npm install
npm start
```

## Tests

Unit tests are authored and ran with Jest, while end-to-end tests are executed via Cypress.

```
npm test
npx cypress open
```

## Bot

For the bot to work properly on a Discord server, it requires:

- A #trivia channel for the `!trivia` command.
- A #stormbot channel for all the other commands.
- Ideally some of the roles: Diamond, Platinum, Gold, Silver, Bronze, Iron, Starter, Swarm, Shadowfen, Ironclad, Winter, Neutral, Tournamentee, Artist and Streambound.

## Acknowledgements

[![Powered by Vercel](https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg)](https://vercel.com/?utm_source=stormbound&utm_campaign=oss)

[![Powered by Sanity](https://stormbound-kitty.com/assets/images/sanity-logo.png)](https://www.sanity.io/)
