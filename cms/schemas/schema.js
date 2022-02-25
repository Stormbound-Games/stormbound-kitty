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
import columns from './types/columns'
import card from './types/card'
import deckEmbed from './types/deck'
import info from './types/info'
import manaGraph from './types/manaGraph'
import tableOfContents from './types/tableOfContents'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // Documents
    artwork,
    avatar,
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
    channel,

    // Rich text editor modules
    battleSim,
    card,
    deckEmbed,
    columns,
    info,
    manaGraph,
    tableOfContents,
  ]),
})
