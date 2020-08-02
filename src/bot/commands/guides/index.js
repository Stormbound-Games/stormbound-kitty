import GUIDES from '../../../data/guides'
import getEmbed from '../../../helpers/getEmbed'
import { CATEGORIES } from '../../../constants/guides'

export default {
  command: 'guides',
  label: '🧭  Guides',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/guides')
      .setDescription('List all existing guides from Stormbound-Kitty.')
  },
  handler: function (message) {
    const match = GUIDES.find(guide =>
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
          Object.keys(CATEGORIES).reduce((desc, category) => {
            desc += '\n\n**' + CATEGORIES[category].name.long + '**\n'
            desc += GUIDES.filter(guide => guide.category === category)
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
