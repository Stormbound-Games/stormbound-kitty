import getChannelId, { KITTY_SERVER } from '../../../src/helpers/getChannelId'

const getMessage = () => {
  const message = {}
  message.channel = {}
  message.channel.guild = { id: KITTY_SERVER }
  message.guild = {}
  message.guild.channels = {}
  message.guild.channels.cache = [
    { name: 'trivia', id: 'trid' },
    { name: 'stormbot', id: 'stid' },
  ]
  return message
}

describe('The `getChannelId` helper', () => {
  it('should return null for a trivia command outside of the trivia channel', () => {
    const message = getMessage()
    message.channel.name = 'general'
    expect(getChannelId(message, { command: 'trivia' })).to.equal(null)
  })

  it('should return null for a non-trivia command in the trivia channel', () => {
    const message = getMessage()
    message.channel.name = 'trivia'
    expect(getChannelId(message, { command: 'deckid' })).to.equal(null)
  })

  it('should return the trivia channel ID for a trivia command', () => {
    const message = getMessage()
    message.channel.name = 'trivia'
    expect(getChannelId(message, { command: 'trivia' })).to.equal('trid')
  })

  it('should return the bot channel ID otherwise', () => {
    const message = getMessage()
    message.channel.name = 'general'
    expect(getChannelId(message, { command: 'deckid' })).to.equal('stid')
  })
})
