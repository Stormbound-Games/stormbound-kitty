import { TRIVIA_CHANNEL } from '../../../constants/bot'
import capitalise from '../../../helpers/capitalise'
import toSentence from '../../../helpers/toSentence'

const LEAGUE_ROLES = [
  'Diamond',
  'Platinum',
  'Gold',
  'Silver',
  'Bronze',
  'Iron',
  'Starter',
]
const MISC_ROLES = ['Tournamentee', 'Streambound']
const ROLES = [...LEAGUE_ROLES, ...MISC_ROLES]

const getExpectedRole = ({ content, guild }) => {
  const message = content.replace('!role', '').trim().toLowerCase()
  const roleName = ROLES.find(role => capitalise(message) === role)

  if (!roleName) return null

  return guild.roles.cache.find(role => role.name === roleName)
}

const getExistingLeagueRole = ({ member }) => {
  return member.roles.cache.find(role => LEAGUE_ROLES.includes(role.name))
}

const hasRole = (member, role) => {
  return member.roles.cache.find(r => r.name === role.name)
}

export default {
  command: 'role',
  isAllowed: channel => channel.id !== TRIVIA_CHANNEL,
  help: function () {
    return `🌟  **Role Assignment:** Assign yourself a decorative role (regardless of casing). Use the command again to have the role removed. Available roles are ${toSentence(
      ROLES,
      'and'
    )}. For instance \`!${this.command} diamond\`.`
  },
  handler: async function (message, client, messageObject) {
    const newRole = getExpectedRole(messageObject)

    // If the given argument is not an allowed role, abort.
    if (!newRole) return

    // If the user already has the expected role, remove it, like a toggle.
    if (hasRole(messageObject.member, newRole)) {
      await messageObject.member.roles.remove(newRole)

      return `“${newRole.name}” role removed.`
    }

    // If the user already has a league role and wants a new league role, start
    // by removing it the old one.
    const existingLeagueRole = getExistingLeagueRole(messageObject)
    const wantsLeagueRole = LEAGUE_ROLES.includes(newRole.name)

    if (wantsLeagueRole && existingLeagueRole) {
      await messageObject.member.roles.remove(existingLeagueRole)
    }

    // Add the new role to the member.
    await messageObject.member.roles.add(newRole)

    // Return what happened.
    return `“${newRole.name}” role added${
      wantsLeagueRole && existingLeagueRole
        ? ` and “${existingLeagueRole.name}” role removed`
        : ''
    }.`
  },
}
