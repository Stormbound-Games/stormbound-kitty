import { TRIVIA_CHANNEL } from '../../../constants/bot'
import capitalise from '../../../helpers/capitalise'

const ROLES = ['Diamond', 'Platinum', 'Gold', 'Silver', 'Bronze']

const getExpectedRole = ({ content, guild }) => {
  const message = content.replace('!league', '').trim().toLowerCase()
  const roleName = ROLES.find(role => capitalise(message) === role)

  if (!roleName) return null

  return guild.roles.cache.find(role => role.name === roleName)
}

const getExistingRole = ({ member }) => {
  return member.roles.cache.find(role => ROLES.includes(role.name))
}

export default {
  command: 'league',
  isAllowed: channel => channel.id !== TRIVIA_CHANNEL,
  help: function () {
    return `🌟  **League Role Assignment:** Assign yourself a role named after a Stormbound league (regardless of casing). Use the command again to have the role removed. For instance \`!${this.command} diamond\`.`
  },
  handler: async function (message, client, messageObject) {
    const newRole = getExpectedRole(messageObject)
    const existingRole = getExistingRole(messageObject)

    // If the given argument is not a league role, abort.
    if (!newRole) return

    // If the user already has a league role, start by removing it.
    if (existingRole) {
      await messageObject.member.roles.remove(existingRole)
    }

    // If the existing role and the new role are the same, simply remove the
    // role, like a toggle.
    if (existingRole && newRole.id === existingRole.id) {
      return `“${existingRole.name}” league removed.`
    }

    // Add the new role to the member.
    await messageObject.member.roles.add(newRole)

    // Return what happened.
    return `“${newRole.name}” league added${
      existingRole ? ` and “${existingRole.name}” league removed` : ''
    }.`
  },
}
