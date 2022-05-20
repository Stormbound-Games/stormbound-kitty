import defaultResolve, {
  PublishAction,
  DiscardChangesAction,
} from 'part:@sanity/base/document-actions'

export default function resolveDocumentActions(props) {
  if (props.type === 'siteSettings' || props.type === 'equalTierList') {
    return [PublishAction, DiscardChangesAction]
  }

  return [...defaultResolve(props)]
}
