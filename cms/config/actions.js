import defaultResolve, {
  DeleteAction,
  PublishAction,
  DiscardChangesAction,
} from 'part:@sanity/base/document-actions'

export default function resolveDocumentActions(props) {
  if (['siteSettings', 'equalTierList'].includes(props.type)) {
    return [PublishAction, DiscardChangesAction]
  }

  // Make sure cards and books documents cannot be deleted, as it would be
  // pretty problematic for the site to function normally. If a new card/book
  // entry is created by mistake, it can be deleted in the local studio by
  // commenting out this condition beforehand.
  if (['card', 'book'].includes(props.type)) {
    return [...defaultResolve(props)].filter(action => action !== DeleteAction)
  }

  return [...defaultResolve(props)]
}