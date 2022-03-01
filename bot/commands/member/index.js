import getEmbed from '~/helpers/getEmbed'
import capitalize from '~/helpers/capitalize'
import getContentFromUser from '~/api/users/getContentFromUser'

const BASE_URL = 'https://stormbound-kitty.com'

const member = {
  command: 'member',
  label: '😻  SK member',
  help: function () {
    return getEmbed()
      .setTitle(`${this.label}: help`)
      .setURL(BASE_URL)
      .setDescription(
        'Retrieve someone’s contributions from Stormbound-Kitty based on their username (e.g. `!member kitty`).'
      )
  },
  handler: async function (message) {
    if (message.trim() === '') return

    const id = message.toLowerCase()
    const user = await getContentFromUser({ author: id })
    const embed = getEmbed()
      .setTitle(`${this.label}: ${user.name}`)
      .setURL(BASE_URL + `/members/${user.slug}`)

    if (user.contributions === 0) {
      return embed.setDescription(
        `There are no contributions found from ${user.name} on Stormbound-Kitty.`
      )
    }

    const isKAT = user.role === 'KAT' || user.role === 'SUPER_KAT'
    const isSuperKAT = user.role === 'SUPER_KAT'
    const KATMessage = isKAT
      ? `\n**They are also a ${isSuperKAT ? 'super' : ''} KAT member!**`
      : ''
    const { channel, ...content } = user.content
    const fields = Object.entries(content)
      .map(([type, entries]) => ({
        name: capitalize(type),
        value: entries.length,
        inline: true,
      }))
      .filter(entry => entry.value > 0)
      .sort((a, b) => b.value - a.value)

    return embed
      .setDescription(
        `${user.name} is a member of the community and has issued ${
          user.contributions
        } contribution${user.contributions === 1 ? '' : 's'}.${KATMessage}`
      )
      .addFields(...fields)
  },
}

export default member
