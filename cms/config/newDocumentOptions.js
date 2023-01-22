import { SINGLETON_TYPES } from './structure'
import { isAdmin, COMMUNITY_TYPES } from './access'

export default function newDocumentOptions(prev, context) {
  if (!window._sanityUser) window._sanityUser = context.currentUser

  return prev.filter(
    ({ templateId }) =>
      !SINGLETON_TYPES.includes(templateId) &&
      (isAdmin() || COMMUNITY_TYPES.includes(templateId))
  )
}
