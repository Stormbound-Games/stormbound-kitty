# Stormbound-Kitty

Source code for [Stormbound-Kitty](https://stormbound-kitty.com/).

## Documentation

- [Adding a deck](./docs/ADDING_A_DECK.md)

## Development

The site is a fully client-side [create-react-app](https://create-react-app.dev/) application. Therefore, it uses Node.js (version 14). It is recommended to install [nvm](https://github.com/nvm-sh/nvm) (or [nvm-windows](https://github.com/coreybutler/nvm-windows)) to manage Node versions, but it’s not mandatory, as long as Node 14 is installed on the machine.

After having cloned the project locally, create a `.env` file at the root of the project, and set the following content inside it:

```
NODE_ENV=development
```

Then run the following commands to install the local dependencies and start the development server:

```
npm install
npm start
```

## Bot

For the bot to work properly on a Discord server, it requires:

- A #trivia channel for the `!trivia` command.
- A #stormbot channel for all the other commands.
- Ideally some of the roles: Diamond, Platinum, Gold, Silver, Bronze, Iron, Starter, Swarm, Shadowfen, Ironclad, Winter, Neutral, Tournamentee, Artist and Streambound.
