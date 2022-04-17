import getEmbed from '~/helpers/getEmbed'
import getGuides from '~/api/guides/getGuides'
import { GUIDE_CATEGORIES } from '~/constants/guides'

const guides = {
  command: 'guides',
  label: '🧭  Guides',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/guides')
      .setDescription('List all existing guides from Stormbound-Kitty.')
  },
  handler: async function (message) {
    const guides = await getGuides()
    const match = guides.find(guide =>
      guide.name.toLowerCase().includes(message)
    )

    if (message && match) {
      return getEmbed()
        .setTitle(match.name)
        .setURL('https://stormbound-kitty.com/guides/' + match.slug)
        .setDescription(match.excerpt)
    } else if (!message) {
      return getEmbed()
        .setTitle(`${this.label}`)
        .setURL('https://stormbound-kitty.com/guides')
        .setDescription(
          Object.keys(GUIDE_CATEGORIES).reduce((desc, category) => {
            desc += '\n\n**' + GUIDE_CATEGORIES[category].name.long + '**\n'
            desc += guides
              .filter(guide => guide.category === category)
              .map(
                guide =>
                  guide.name +
                  ': https://stormbound-kitty.com/guides/' +
                  guide.slug
              )
              .join('\n')

            return desc
          }, '')
        )
    }
  },
}

export default guides
