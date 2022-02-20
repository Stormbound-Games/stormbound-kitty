import getEmbed from '~/helpers/getEmbed'
import toSentence from '~/helpers/toSentence'

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
const MISC_ROLES = [
  'Tournamentee',
  'Streambound',
  'SWCC',
  'BS squad',
  'Artist',
  'Toad-Gamer',
]
const ROLES = [...LEAGUE_ROLES, ...FACTION_ROLES, ...MISC_ROLES]

const getAvailableRoles = guild => {
  return ROLES.filter(roleName =>
    guild.roles.cache.find(r => r.name === roleName)
  )
}

const getExpectedRole = ({ content, guild }) => {
  const message = content.replace('!role', '').trim().toLowerCase()
  const roleName = ROLES.find(role => message === role.toLowerCase())

  if (!roleName) return null

  return guild.roles.cache.find(role => role.name === roleName)
}

const getExistingLeagueRole = ({ member }) => {
  return member.roles.cache.find(role => LEAGUE_ROLES.includes(role.name))
}

const getExistingFactionRole = ({ member }) => {
  return member.roles.cache.find(role => FACTION_ROLES.includes(role.name))
}

const hasRole = (member, role) => {
  return member.roles.cache.find(r => r.name === role.name)
}

const role = {
  command: 'role',
  label: '🌟  Role Assignment',
  help: function (message, client, messageObject) {
    const embed = getEmbed().setTitle(`${this.label}: help`)

    let help = `Assign yourself a decorative role (regardless of casing). Use the command again to have the role removed.`

    const availableRoles = getAvailableRoles(messageObject.guild)

    if (availableRoles.length > 0) {
      help += ` Available roles are ${toSentence(
        availableRoles,
        'and'
      )}. For instance \`!${this.command} ${availableRoles[0].toLowerCase()}\`.`
    } else {
      help += ' Unfortunately this server does not have any self-assigned role.'
    }

    embed.setDescription(help)

    return embed
  },
  handler: async function (message, client, messageObject) {
    const newRole = getExpectedRole(messageObject)

    // If the given argument is not an allowed role, abort.
    if (!newRole) return

    const embed = getEmbed().setTitle(`${this.label}: ${newRole.name}`)

    // If the user already has the expected role, remove it, like a toggle.
    if (hasRole(messageObject.member, newRole)) {
      await messageObject.member.roles.remove(newRole)

      embed.setDescription(`“${newRole.name}” role removed.`)

      return embed
    }

    // If the user already has a league role and wants a new league role, start
    // by removing it the old one. Similar thing for faction roles.
    const existingLeagueRole = getExistingLeagueRole(messageObject)
    const existingFactionRole = getExistingFactionRole(messageObject)
    const wantsLeagueRole = LEAGUE_ROLES.includes(newRole.name)
    const wantsFactionRole = FACTION_ROLES.includes(newRole.name)

    if (wantsLeagueRole && existingLeagueRole) {
      await messageObject.member.roles.remove(existingLeagueRole)
    }

    if (wantsFactionRole && existingFactionRole) {
      await messageObject.member.roles.remove(existingFactionRole)
    }

    // Add the new role to the member.
    await messageObject.member.roles.add(newRole)

    // Return what happened.
    embed.setDescription(
      `“${newRole.name}” role added${
        wantsLeagueRole && existingLeagueRole
          ? ` and “${existingLeagueRole.name}” role removed`
          : wantsFactionRole && existingFactionRole
          ? ` and “${existingFactionRole.name}” role removed`
          : ''
      }.`
    )

    return embed
  },
}

export default role
