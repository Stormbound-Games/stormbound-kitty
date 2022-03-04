import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import artwork from './documents/artwork'
import avatar from './documents/avatar'
import book from './documents/book'
import card from './documents/card'
import changelog from './documents/changelog'
import contribution from './documents/contribution'
import deck from './documents/deck'
import donation from './documents/donation'
import equalTierList from './documents/equalTierList'
import event from './documents/event'
import faq from './documents/faq'
import guide from './documents/guide'
import news from './documents/news'
import podcast from './documents/podcast'
import puzzle from './documents/puzzle'
import release from './documents/release'
import siteSettings from './documents/siteSettings'
import story from './documents/story'
import swcc from './documents/swcc'
import tournament from './documents/tournament'
import user from './documents/user'
import wallpaper from './documents/wallpaper'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    siteSettings,
    equalTierList,
    artwork,
    avatar,
    book,
    podcast,
    card,
    changelog,
    contribution,
    deck,
    donation,
    event,
    faq,
    guide,
    news,
    puzzle,
    release,
    story,
    swcc,
    tournament,
    user,
    wallpaper,
  ]),
})
