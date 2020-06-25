const GUMROAD_URL = 'https://gumroad.com/l/stormbound-kitty'
const BASE_MESSAGE =
  'This Discord bot and <https://stormbound-kitty.com> are solely maintained by <@368097495605182483> and 100% free — no ads, no tracking, no paywall. If you enjoy them, please consider donating:'

export default {
  command: 'donate',
  help: function () {
    return `💸  **Donate:** ${BASE_MESSAGE}\n<${GUMROAD_URL}>`
  },
  handler: function (message) {
    const [amount] = message.match(/\d+/g) || []

    if (amount) {
      return `${BASE_MESSAGE}\n<${GUMROAD_URL}?price=${amount}>`
    }

    return `${BASE_MESSAGE}\n<${GUMROAD_URL}>`
  },
}
