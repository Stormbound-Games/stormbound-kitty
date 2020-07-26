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
  },
}
