import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import artwork from './artwork'
import avatar from './avatar'
import channel from './channel'
import contribution from './contribution'
import deck from './deck'
import donation from './donation'
import event from './event'
import faq from './faq'
import guide from './guide'
import news from './news'
import podcast from './podcast'
import puzzle from './puzzle'
import story from './story'
import swcc from './swcc'
import tournament from './tournament'
import wallpaper from './wallpaper'
import battleSim from './types/battleSim'
import cardLink from './types/cardLink'
import info from './types/info'
import link from './types/link'
import tableOfContents from './types/tableOfContents'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // Documents
    artwork,
    avatar,
    channel,
    contribution,
    deck,
    donation,
    event,
    faq,
    guide,
    news,
    podcast,
    puzzle,
    story,
    swcc,
    tournament,
    wallpaper,

    // Rich text editor modules
    battleSim,
    cardLink,
    info,
    link,
    tableOfContents,
  ]),
})
