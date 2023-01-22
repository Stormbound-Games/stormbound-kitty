import { COMMUNITY_TYPES, isAdmin, isNotAdmin } from './access'
import artwork from '../schemas/documents/artwork'
import avatar from '../schemas/documents/avatar'
import book, { bookOrder } from '../schemas/documents/book'
import brawl from '../schemas/documents/brawl'
import card from '../schemas/documents/card'
import changelog from '../schemas/documents/changelog'
import contribution from '../schemas/documents/contribution'
import deck from '../schemas/documents/deck'
import deckTag, { deckTagOrder } from '../schemas/documents/deckTag'
import donation from '../schemas/documents/donation'
import equalTierList from '../schemas/documents/equalTierList'
import event from '../schemas/documents/event'
import guide from '../schemas/documents/guide'
import news from '../schemas/documents/news'
import page from '../schemas/documents/page'
import podcast from '../schemas/documents/podcast'
import puzzle from '../schemas/documents/puzzle'
import release from '../schemas/documents/release'
import siteSettings from '../schemas/documents/siteSettings'
import story from '../schemas/documents/story'
import swcc from '../schemas/documents/swcc'
import tournament from '../schemas/documents/tournament'
import trivia from '../schemas/documents/trivia'
import user from '../schemas/documents/user'
import wallpaper from '../schemas/documents/wallpaper'

export default Object.entries({
  artwork,
  avatar,
  book,
  brawl,
  card,
  changelog,
  contribution,
  deck,
  deckTag,
  donation,
  equalTierList,
  event,
  guide,
  news,
  page,
  podcast,
  puzzle,
  release,
  siteSettings,
  story,
  swcc,
  tournament,
  trivia,
  user,
  wallpaper,
})
  .map(([type, document]) => addReadOnly(type)(document))
  .map(type => {
    if (type.type === 'document' && !COMMUNITY_TYPES.includes(type.name)) {
      return { ...type, __experimental_omnisearch_visibility: isAdmin() }
    }

    return type
  })

function addReadOnly(type) {
  return function (docOrField) {
    // If the field belongs to a portable text block, there is nothing to
    // update as there is concept of readonly.
    if (docOrField.type === 'block') return docOrField

    // If the field is a public field (as in not restricted to administrators
    // only), there is nothing to update.
    if (COMMUNITY_TYPES.includes(type)) return docOrField

    // Make sure not to mutate fields, which is a problem for shared types like
    // `banner`, `cardLink`…
    const clone = { ...docOrField }

    // Recursively mark all fields as readonly, which is important for fields
    // with nested fields such as `banner`.
    if ('fields' in docOrField) {
      clone.fields = clone.fields.map(addReadOnly(type))
    }

    // For array fields, mark all options as readonly.
    if ('of' in docOrField) {
      clone.of = clone.of.map(addReadOnly(type))
    }

    // Unless we already have a readonly property, make sure that the field can
    // only be updated by administrators.
    if (typeof docOrField.readOnly !== 'undefined') {
      clone.readOnly = isNotAdmin
    }

    return clone
  }
}

export const getOrderingFields = (S, context) => [
  bookOrder(S, context),
  deckTagOrder(S, context),
]
