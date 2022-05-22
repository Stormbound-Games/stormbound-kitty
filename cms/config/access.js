import tools from 'all:part:@sanity/base/tool'
import userStore from 'part:@sanity/base/user'

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
  'user',
]

export const isNotAdmin = payload => !isAdmin(payload)
export const isAdmin = ({ currentUser = window._sanityUser } = {}) =>
  currentUser?.role === 'administrator' ||
  currentUser?.roles.some(role => role.name === 'administrator')

export const getCurrentUser = () => {
  userStore.me.subscribe(user => {
    window._sanityUser = user || undefined

    // Hide all tools but the desk.
    if (isNotAdmin({ currentUser: user })) tools.splice(1)
  })
}
