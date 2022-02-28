import getEmbed from '~/helpers/getEmbed'
import capitalize from '~/helpers/capitalize'
import getMemberContent from '~/helpers/getMemberContent'

const BASE_URL = 'https://stormbound-kitty.com'
const aggregate = (acc, { entries }) => acc + entries.length
const getEmbedField = details => type => ({
  name: capitalize(type),
  value:
    type === 'contributions'
      ? details[type].reduce(aggregate, 0)
      : details[type].length,
  inline: true,
})

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
  handler: async function (message, client, messageObject) {
    if (message.trim() === '') {
      return
    }

    const id = message.toLowerCase()
    const { count, details, displayName, roles } = await getMemberContent({
      id,
    })
    const embed = getEmbed()
      .setTitle(`${this.label}: ${displayName}`)
      .setURL(BASE_URL + `/members/${id}`)

    if (count === 0) {
      return embed.setDescription(
        `There are no contributions found from ${displayName} on Stormbound-Kitty.`
      )
    }

    const { isKAT, isSuperKAT } = roles
    const KATMessage = isKAT
      ? `\n**They are also a ${isSuperKAT ? 'super' : ''} KAT member!**`
      : ''
    const fields = Object.keys(details)
      .map(getEmbedField(details))
      .filter(entry => entry.value > 0)
      .sort((a, b) => b.value - a.value)

    return embed
      .setDescription(
        `${displayName} is a member of the community and has issued ${count} contribution${
          count === 1 ? '' : 's'
        }.${KATMessage}`
      )
      .addFields(...fields)
  },
}

export default member
