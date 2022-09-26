import { SlashCommandBuilder } from 'discord.js'
import getGuides from '#api/guides/getGuides'
import { GUIDE_CATEGORIES } from '#constants/guides'
import getEmbed from '#helpers/getEmbed'
import trackBotCommand from '#helpers/trackBotCommand'

const guides = {
  data: new SlashCommandBuilder()
    .setName('guides')
    .setDescription(
      'List existing guides from Stormbound-Kitty or search for a specific guide.'
    )
    .addStringOption(option =>
      option.setName('input').setDescription('The optional search parameter.')
    ),

  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const message = interaction.options.getString('input')
    const guides = await getGuides()
    const match = guides.find(guide =>
      guide.name.toLowerCase().includes(message)
    )
    const embed = getEmbed()
      .setTitle('🧭 Guides')
      .setURL('https://stormbound-kitty.com/guides')

    trackBotCommand(interaction, { input: message })

    if (message) {
      if (!match) {
        embed.setDescription(`Could not find a guide matching “${message}”.`)

        return interaction.reply({ embeds: [embed], ephemeral })
      }

      return interaction.reply({
        content: 'https://stormbound-kitty.com/guides/' + match.slug,
        ephemeral,
      })
    }

    embed.setDescription(
      Object.keys(GUIDE_CATEGORIES).reduce((desc, category) => {
        desc += '\n\n**' + GUIDE_CATEGORIES[category].name.long + '**\n'
        desc += guides
          .filter(guide => guide.category === category)
          .map(
            guide =>
              guide.name + ': https://stormbound-kitty.com/guides/' + guide.slug
          )
          .join('\n- ')

        return desc
      }, '')
    )

    return interaction.reply({ embeds: [embed], ephemeral })
  },
}

export default guides
