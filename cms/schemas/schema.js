import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import artwork from './documents/artwork'
import avatar from './documents/avatar'
import channel from './documents/channel'
import changelog from './documents/changelog'
import contribution from './documents/contribution'
import deck from './documents/deck'
import donation from './documents/donation'
import event from './documents/event'
import faq from './documents/faq'
import guide from './documents/guide'
import news from './documents/news'
import podcast from './documents/podcast'
import puzzle from './documents/puzzle'
import release from './documents/release'
import story from './documents/story'
import swcc from './documents/swcc'
import tournament from './documents/tournament'
import wallpaper from './documents/wallpaper'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    artwork,
    avatar,
    changelog,
    contribution,
    deck,
    donation,
    event,
    faq,
    guide,
    news,
    podcast,
    puzzle,
    release,
    story,
    swcc,
    tournament,
    wallpaper,
    channel,
  ]),
})
