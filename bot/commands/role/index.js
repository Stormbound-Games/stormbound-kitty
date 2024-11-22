import { SlashCommandBuilder } from 'discord.js'
import getEmbed from '#helpers/getEmbed'

const LEAGUE_ROLES = [
  'Heroes',
  'Diamond',
  'Platinum',
  'Gold',
  'Silver',
  'Bronze',
  'Iron',
  'Starter',
]
const FACTION_ROLES = ['Swarm', 'Shadowfen', 'Ironclad', 'Winter', 'Neutral']
const MISC_ROLES = ['Tournamentee', 'Streambound', 'SCCC', 'BS squad', 'Artist']
const ROLES = [...LEAGUE_ROLES, ...FACTION_ROLES, ...MISC_ROLES]

const getExistingLeagueRole = member => {
  return member.roles.cache.find(role => LEAGUE_ROLES.includes(role.name))
}

const getExistingFactionRole = member => {
  return member.roles.cache.find(role => FACTION_ROLES.includes(role.name))
}

const role = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Assign yourself (or remove) a decorative role.')
    .addStringOption(option =>
      option
        .setName('role')
        .setDescription('Role to add/remove.')
        .setRequired(true)
        .addChoices(...ROLES.map(role => ({ name: role, value: role }))),
    ),

  async execute(interaction, client) {
    const ephemeral = !client.DEBUG_MODE
    const newRoleName = interaction.options.getString('role')
    const member = interaction.member
    const guild = client.guilds.cache.get(interaction.guildId)
    const validRoleNames = ROLES.filter(roleName =>
      guild.roles.cache.find(role => role.name === roleName),
    )
    const embed = getEmbed().setTitle('🌟 Role Assignment')

    if (!validRoleNames.includes(newRoleName)) {
      embed.setDescription(`The “${newRoleName}” role cannot be self-assigned.`)

      return interaction.reply({ embeds: [embed], ephemeral })
    }

    const newRole = guild.roles.cache.find(role => role.name === newRoleName)

    if (member.roles.cache.some(role => role.name === newRole.name)) {
      embed.setDescription(`“${newRole.name}” role removed.`)
      member.roles.remove(newRole)
      return interaction.reply({ embeds: [embed], ephemeral })
    }

    // If the user already has a league role and wants a new league role, start
    // by removing it the old one. Similar thing for faction roles.
    const existingLeagueRole = getExistingLeagueRole(member)
    const existingFactionRole = getExistingFactionRole(member)
    const wantsLeagueRole = LEAGUE_ROLES.includes(newRole.name)
    const wantsFactionRole = FACTION_ROLES.includes(newRole.name)

    if (wantsLeagueRole && existingLeagueRole) {
      member.roles.remove(existingLeagueRole)
    }

    if (wantsFactionRole && existingFactionRole) {
      member.roles.remove(existingFactionRole)
    }

    // Add the new role to the member.
    member.roles.add(newRole)

    const content = `“${newRole.name}” role added${
      wantsLeagueRole && existingLeagueRole
        ? ` and “${existingLeagueRole.name}” role removed`
        : wantsFactionRole && existingFactionRole
        ? ` and “${existingFactionRole.name}” role removed`
        : ''
    }.`
    embed.setDescription(content)

    return interaction.reply({ embeds: [embed], ephemeral })
  },
}

export default role
