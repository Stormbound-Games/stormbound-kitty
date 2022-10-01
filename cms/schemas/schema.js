import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import artwork from './documents/artwork'
import avatar from './documents/avatar'
import book from './documents/book'
import brawl from './documents/brawl'
import card from './documents/card'
import changelog from './documents/changelog'
import contribution from './documents/contribution'
import deck from './documents/deck'
import deckTags from './documents/deckTags'
import donation from './documents/donation'
import equalTierList from './documents/equalTierList'
import event from './documents/event'
import guide from './documents/guide'
import news from './documents/news'
import page from './documents/page'
import podcast from './documents/podcast'
import puzzle from './documents/puzzle'
import release from './documents/release'
import siteSettings from './documents/siteSettings'
import story from './documents/story'
import swcc from './documents/swcc'
import tournament from './documents/tournament'
import trivia from './documents/trivia'
import user from './documents/user'
import wallpaper from './documents/wallpaper'
import { isNotAdmin, COMMUNITY_TYPES } from '../config/access'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat(
    Object.entries({
      artwork,
      avatar,
      book,
      brawl,
      card,
      changelog,
      contribution,
      deck,
      deckTags,
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
    }).map(([type, document]) => ({
      ...document,
      fields: document.fields.map(addReadOnly(type)),
    }))
  ),
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
