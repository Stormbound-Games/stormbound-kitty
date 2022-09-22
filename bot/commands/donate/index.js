import { SlashCommandBuilder } from 'discord.js'

const donate = {
  data: new SlashCommandBuilder()
    .setName('donate')
    .setDescription(
      'Get information to support Kitty maintaining this Discord bot as well as Stormbound-Kitty.'
    ),

  async execute(interaction, client) {
    return interaction.reply({
      content:
        'This Discord bot and <https://stormbound-kitty.com> are solely maintained by <@368097495605182483> and 100% free — no ads, no marketing tracking, no paywall. If you enjoy them, please consider donating: <https://stormbound-kitty.com/contribute>',
      ephemeral: !client.DEBUG_MODE,
    })
  },
}

export default donate
