import { SlashCommandBuilder } from 'discord.js'
import getEmbed from '#helpers/getEmbed'
import capitalize from '#helpers/capitalize'
import groupBy from '#helpers/groupBy'
import trackBotCommand from '#helpers/trackBotCommand'
import getContentFromUser from '#api/users/getContentFromUser'

const BASE_URL = 'https://stormbound-kitty.com'

const member = {
  data: new SlashCommandBuilder()
    .setName('member')
    .setDescription(
      'Retrieve someone’s contributions from Stormbound-Kitty based on their username.'
    )
    .addStringOption(option =>
      option
        .setName('username')
        .setDescription(
          'The member’s username as it appears on the site (regardless of casing).'
        )
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const username = interaction.options.getString('username').toLowerCase()
    const { user, feed } = await getContentFromUser({ slug: username })
    const embed = getEmbed().setTitle('😻 SK member')

    trackBotCommand(interaction, { username })

    if (!user || feed.length === 0) {
      const name = user?.name ?? username

      embed
        .setURL(BASE_URL + `/members`)
        .setDescription(`There is no one named “${name}” on Stormbound-Kitty.`)

      return interaction.reply({ embeds: [embed], ephemeral })
    }

    embed.setURL(BASE_URL + `/members/${user.slug}`)

    const isKAT = user.role === 'KAT' || user.role === 'SUPER_KAT'
    const isSuperKAT = user.role === 'SUPER_KAT'
    const KATMessage = isKAT
      ? `\n**They are also a ${isSuperKAT ? 'super' : ''} KAT member!**`
      : ''
    const fields = Object.entries(groupBy(feed, '_type'))
      .map(([type, entries]) => ({
        name: capitalize(type),
        value: String(entries.length),
        inline: true,
      }))
      .filter(entry => entry.value > 0)
      .sort((a, b) => b.value - a.value)

    embed
      .setDescription(
        `${user.name} is a member of the community and has issued ${
          feed.length
        } contribution${feed.length === 1 ? '' : 's'}.${KATMessage}`
      )
      .addFields(...fields)

    return interaction.reply({ embeds: [embed], ephemeral })
  },
}

export default member
