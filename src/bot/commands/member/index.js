import fetch from 'node-fetch'
import getEmbed from '../../../helpers/getEmbed'
import capitalise from '../../../helpers/capitalise'
import isKATMember from '../../../helpers/isKATMember'
import getMemberContent from '../../../hooks/useMemberContent'

const BASE_URL = 'https://stormbound-kitty.com'
const aggregate = (acc, { entries }) => acc + entries.length
const getEmbedField = details => type => ({
  name: capitalise(type),
  value:
    type === 'contributions'
      ? details[type].reduce(aggregate, 0)
      : details[type].length,
  inline: true,
})

export default {
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
    const id = message.toLowerCase()
    const response = await fetch(BASE_URL + '/stories.json')
    const stories = await response.json()
    const { count, details, displayName } = getMemberContent(id, stories)
    const embed = getEmbed()
      .setTitle(`${this.label}: ${displayName}`)
      .setURL(BASE_URL + `/member/${id}`)

    if (count === 0) {
      return embed.setDescription(
        `There are no contributions found from ${displayName} on Stormbound-Kitty.`
      )
    }

    const { isKAT, isSuperKAT } = isKATMember(details)
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
