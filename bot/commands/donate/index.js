import getEmbed from '~/helpers/getEmbed'

const BASE_MESSAGE =
  'This Discord bot and <https://stormbound-kitty.com> are solely maintained by <@368097495605182483> and 100% free — no ads, no marketing tracking, no paywall. If you enjoy them, please consider donating: <https://stormbound-kitty.com/contribute>'

const donate = {
  command: 'donate',
  label: '💸  Donate',
  aliases: ['contribute'],
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL('https://stormbound-kitty.com/contribute')
      .setDescription(BASE_MESSAGE)
  },
  handler: function () {
    return getEmbed()
      .setTitle(`${this.label}`)
      .setURL('https://stormbound-kitty.com/contribute')
      .setDescription(BASE_MESSAGE)
  },
}

export default donate
