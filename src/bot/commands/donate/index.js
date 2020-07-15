import getEmbed from '../../../helpers/getEmbed'

const BASE_MESSAGE =
  'This Discord bot and <https://stormbound-kitty.com> are solely maintained by <@368097495605182483> and 100% free — no ads, no tracking, no paywall. If you enjoy them, please consider donating: <https://stormbound-kitty.com/donate>'

export default {
  command: 'donate',
  help: function () {
    return getEmbed()
      .setTitle(`💸  Donate: help`)
      .setURL('https://stormbound-kitty.com/donate')
      .setDescription(BASE_MESSAGE)
  },
  handler: function () {
    return getEmbed()
      .setTitle(`💸  Donate`)
      .setURL('https://stormbound-kitty.com/donate')
      .setDescription(BASE_MESSAGE)
  },
}
