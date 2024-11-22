# Discord Bot

## Development

The bot can be run locally on Kitty’s personal Discord server to test the code before deploying it to production. First, ensure you have a valid [Discord token](https://discordhelp.net/discord-token) set in your `.env` file (as `DISCORD_TOKEN`), then run the following command:

```sh
npm run bot:dev
```

## Deployment

The bot is automatically deployed on Heroku with every commit that gets pushed to the `main` branch. This environment is named [stormbound-kitty-bot](https://github.com/Stormbound-Games/stormbound-kitty/deployments/activity_log?environment=stormbound-kitty-bot) on GitHub.

### Updating commands

Updating the definition of Discord bot commands requires a manual intervention. First, make sure you have a `.env` file at the root of the repository with the following environment variables:

```
DISCORD_APP_ID=714857388229787809
DISCORD_TOKEN=<secret>
NODE_ENV=development
```

You can find the Discord token in the Heroku environment variables for the project.

Then, execute the following command where the Discord server ID is the ID of the Discord server using the bot (the one in the example below is the official Stormbound Discord ID):

```
DISCORD_SERVER_ID=293674725069029377 npm run bot:refresh
```

## Setup

To set up the bot on a new Discord server, follow the [typical process](https://discordpy.readthedocs.io/en/stable/discord.html#inviting-your-bot) to invite it. Then, run the `bot/setup.sh` script passing it the Discord server (guild) ID. It will require a [jsonbin](https://jsonbin.org/) authentication token from Kitty.

```sh
JSONBIN_TOKEN=<token> GUILD_ID=<guild id> bot/setup.sh
```

### Requirements

For the bot to work properly on a Discord server, it requires:

- A #trivia channel for the `/trivia` command.
- Ideally some of the roles: Diamond, Platinum, Gold, Silver, Bronze, Iron, Starter, Swarm, Shadowfen, Ironclad, Winter, Neutral, Tournamentee, Artist and Streambound.
