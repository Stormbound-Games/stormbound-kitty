import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import artwork from './artwork'
import channel from './channel'
import donation from './donation'
import event from './event'
import puzzle from './puzzle'
import story from './story'
import tournament from './tournament'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    artwork,
    channel,
    donation,
    event,
    puzzle,
    story,
    tournament,
  ]),
})
