import GUIDES from '../../../data/guides.json'
import toSentence from '../../../helpers/toSentence'

export default {
  command: 'guides',
  help: function () {
    return `🧭  **Guides:** List all existing guides from Stormbound-Kitty.`
  },
  handler: function (message) {
    return (
      'Please enjoy the following guides:\n' +
      GUIDES.map(
        guide =>
          `- **${guide.name}** *(by ${guide.author})*: <https://stormbound-kitty.com/guides/${guide.slug}>`
      ).join('\n')
    )
  },
}
