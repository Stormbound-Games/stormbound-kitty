import { isNotAdmin, COMMUNITY_TYPES } from './access'

export default function actions(prev, context) {
  if (!window._sanityUser) window._sanityUser = context.currentUser

  if (isNotAdmin() && !COMMUNITY_TYPES.includes(context.schemaType)) {
    return []
  }

  // Make sure cards, books, as well as singleton documents cannot be deleted,
  // duplicated or unpublished, as it would be pretty problematic for the site
  // to function normally. If an entry is created by mistake, it can be deleted
  // in the local studio by commenting out this condition beforehand.
  const sensitiveTypes = ['card', 'book', 'siteSettings', 'equalTierList']
  const sensitiveActions = [
    'UnpublishAction',
    'DeleteAction',
    'DuplicateAction',
  ]

  if (sensitiveTypes.includes(context.schemaType)) {
    return prev.filter(action => !sensitiveActions.includes(action.name))
  }

  return prev
}
