// Document types that can be managed by moderators and community members.
// Anything not listed underneath will be restricted to administrators only.
export const COMMUNITY_TYPES = [
  'artwork',
  'equalTierList',
  'podcast',
  'deck',
  'deckTag',
  'guide',
  'puzzle',
  'story',
  'SWCC',
  'tournament',
  'trivia',
  'user',
]

// Easy way to test the non-admin interface despite having an admin account.
const DEBUG_SIMULATE_NOT_ADMIN = false

export const isNotAdmin = payload =>
  DEBUG_SIMULATE_NOT_ADMIN || !isAdmin(payload)

export const isAdmin = ({ currentUser = window._sanityUser } = {}) => {
  if (DEBUG_SIMULATE_NOT_ADMIN) return false

  return (
    currentUser?.role === 'administrator' ||
    currentUser?.roles.some(role => role.name === 'administrator')
  )
}
