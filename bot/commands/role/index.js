import { SlashCommandBuilder } from 'discord.js'

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
const MISC_ROLES = ['Tournamentee', 'Streambound', 'SWCC', 'BS squad', 'Artist']
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
    .setDescription(
      'Assign yourself (or remove) a decorative role (regardless of casing).'
    )
    .addRoleOption(option =>
      option.setName('role').setDescription('Role to define').setRequired(true)
    ),

  async execute(interaction) {
    const newRole = interaction.options.getRole('role')
    const member = interaction.member
    const roles = ROLES.filter(roleName =>
      interaction.guild.roles.cache.find(r => r.name === roleName)
    )

    if (!roles.includes(newRole.name)) {
      return interaction.reply({
        content: `The “${newRole.name}” role cannot be self-assigned.`,
        ephemeral: true,
      })
    }

    if (member.roles.cache.some(role => role.name === newRole.name)) {
      member.roles.remove(newRole)
      return interaction.reply({
        content: `“${newRole.name}” role removed.`,
        ephemeral: true,
      })
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

    return interaction.reply({
      content: `“${newRole.name}” role added${
        wantsLeagueRole && existingLeagueRole
          ? ` and “${existingLeagueRole.name}” role removed`
          : wantsFactionRole && existingFactionRole
          ? ` and “${existingFactionRole.name}” role removed`
          : ''
      }.`,
      ephemeral: true,
    })
  },
}

export default role
