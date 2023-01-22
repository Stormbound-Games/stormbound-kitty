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
  .map(([type, document]) => ({
    ...document,
    fields: document.fields.map(addReadOnly(type)),
  }))
  .map(type => {
    if (type.type === 'document' && !COMMUNITY_TYPES.includes(type.name)) {
      return { ...type, __experimental_omnisearch_visibility: isAdmin() }
    }

    return type
  })

function addReadOnly(type) {
  return function (field) {
    if (field.type === 'block') return field

    if (
      typeof field.readOnly === 'undefined' &&
      !COMMUNITY_TYPES.includes(type)
    ) {
      field.readOnly = isNotAdmin
    }

    if (typeof field.of !== 'undefined') {
      field.of.forEach(addReadOnly(type))
    }

    return field
  }
}

export const getOrderingFields = (S, context) => [
  bookOrder(S, context),
  deckTagOrder(S, context),
]
