# Stormbound-Kitty

Source code for [Stormbound-Kitty](https://stormbound-kitty.com/).

## Documentation

- [Analytics](./docs/ANALYTICS.md)
- [CMS](./docs/CMS.md)
- [Discord Bot](./docs/DISCORD_BOT.md)
- [Formulas](./docs/FORMULAS.md)
- [Game overlap](./docs/GAME_OVERLAP.md)
- [Known issues](./docs/KNOWN_ISSUES.md)
- [Monitoring](./docs/MONITORING.md)
- [Performance](./docs/PERFORMANCE.md)
- [Security](./docs/SECURITY.md)
- [Workflows](./WORKFLOWS.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)

## Technology stack

- Framework: [Next.js](https://nextjs.org/)
- Styling: [Fela](https://fela.js.org/)
- CI/CD: [GitHub Worklows](https://docs.github.com/en/actions/using-workflows)
- Hosting: [Vercel](https://vercel.com/) (via an [open-source sponsorship](https://vercel.com/support/articles/can-vercel-sponsor-my-open-source-project))
- Monitoring: [Checkly](https://www.checklyhq.com/)
- Testing: [Jest](https://jestjs.io/) unit tests and [Cypress](https://www.cypress.io/) end-to-end tests (via an [open-source plan](https://docs.cypress.io/guides/dashboard/organizations#Open-Source-Plan))
- Analytics: [Plausible](https://plausible.io/)
- URL shortening: [Cutt.ly](https://cutt.ly/) (via an open-source sponsorship)
- CMS: [Sanity](sanity.io/) (via an [open-source plan](https://www.sanity.io/docs/open-source-plan))
- Discord bot hosting: [Heroku](https://www.heroku.com/)

## Development

The site runs with [Next](https://nextjs.org/). Therefore, it uses Node.js (version 16). It is recommended to install [nvm](https://github.com/nvm-sh/nvm) (or [nvm-windows](https://github.com/coreybutler/nvm-windows)) to manage Node versions, but it’s not mandatory, as long as Node 16 is installed on the machine.

Then run the following commands to install the local dependencies and start the development server:

```sh
npm install
npm start
```

## Tests

Unit tests are authored and ran with Jest, while end-to-end tests are executed via Cypress.

```sh
npm test
npx cypress open
```

## CMS

To run the CMS locally, make sure you [have Yarn installed](https://classic.yarnpkg.com/lang/en/docs/install/) then:

```sh
cd cms
yarn
npm start
```

For the preview to work locally, both the local website and the local CMS need to run with the same `SANITY_STUDIO_PREVIEW_TOKEN` environment variable. Set it in `.env` for the Next app, and run the `npm start` command of the CMS passing it the environment variable:

```sh
SANITY_STUDIO_PREVIEW_TOKEN=YourValueHere npm start
```

## Acknowledgements

[![Powered by Vercel](https://www.datocms-assets.com/31049/1618983297-powered-by-vercel.svg)](https://vercel.com/?utm_source=stormbound&utm_campaign=oss)

[![Powered by Sanity](https://stormbound-kitty.com/assets/images/sanity-logo.png)](https://www.sanity.io/)

[![Powered by Cutt.ly](https://cutt.ly/img/cuttly.svg)](https://cutt.ly/)
