import { SlashCommandBuilder } from 'discord.js'
import getGuides from '#api/guides/getGuides'
import { GUIDE_CATEGORIES } from '#constants/guides'

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
    const message = interaction.options.getString('input')
    const guides = await getGuides()
    const match = guides.find(guide =>
      guide.name.toLowerCase().includes(message)
    )

    if (message) {
      return interaction.reply({
        content: match
          ? 'https://stormbound-kitty.com/guides/' + match.slug
          : 'Could not find a guide matching “sdfsf”.',
        ephemeral: !client.DEBUG_MODE,
      })
    }

    return interaction.reply({
      content: Object.keys(GUIDE_CATEGORIES).reduce((desc, category) => {
        desc += '\n\n**' + GUIDE_CATEGORIES[category].name.long + '**\n'
        desc += guides
          .filter(guide => guide.category === category)
          .map(
            guide =>
              guide.name + ': https://stormbound-kitty.com/guides/' + guide.slug
          )
          .join('\n- ')

        return desc
      }, ''),
      ephemeral: !client.DEBUG_MODE,
    })
  },
}

export default guides
