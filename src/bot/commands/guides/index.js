import GUIDES from '../../../data/guides.json'

export default {
  command: 'guides',
  name: 'Guides',
  description: 'List existing guides from Stormbound-Kitty',
  icon: '🧭',
  handler: function (search) {
    return (
      'Please enjoy the following guides:\n' +
      GUIDES.filter(guide => guide.name !== 'Lexicon')
        .map(
          guide =>
            `- **${guide.name}** *(by ${guide.author})*: <https://stormbound-kitty.com${guide.link}>`
        )
        .join('\n')
    )
  },
}
