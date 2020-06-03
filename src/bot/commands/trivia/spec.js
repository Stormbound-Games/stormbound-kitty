import { TRIVIA_CHANNEL } from '../../../constants/bot'
import command from './'
const trivia = command.handler.bind(command)

const client = { channels: { cache: new Map() } }
const channel = { id: TRIVIA_CHANNEL, guild: { id: 'guild_id' } }
const author = { id: 'author_id', username: 'Author' }
const message = { channel, author }

describe('Bot — !trivia', () => {
  it('should return nothing for a missing term', () => {
    expect(trivia('', client, message)).to.equal(undefined)
  })

  it('should be possible to start a card trivia', () => {
    expect(trivia('card', client, message)).to.contain('started')
  })

  it('should not be possible to stop someone else’s trivia', () => {
    const author = { id: 'other_author_id', username: 'Other Author' }
    const message = { channel, author }
    expect(trivia('stop', client, message)).to.equal(undefined)
  })

  it('should be possible to ask for hints', () => {
    expect(trivia('struct', client, message)).to.contain('type')
    expect(trivia('pirate', client, message)).to.contain('race')
    expect(trivia('rare', client, message)).to.contain('rarity')
    expect(trivia('wp', client, message)).to.contain('faction')
    expect(trivia('hero', client, message)).to.contain('hero')
    expect(trivia('elder', client, message)).to.contain('elder')
  })

  it('should be possible to stop one’s own trivia', () => {
    expect(trivia('stop', client, message)).to.contain('ending')
  })

  it('should not be possible to stop a trivia if no trivia started', () => {
    expect(trivia('stop', client, message)).to.equal(undefined)
  })

  it('should be possible to display help', () => {
    expect(trivia('help', client, message)).to.contain('card')
    expect(trivia('help', client, message)).to.contain('question')
    expect(trivia('help', client, message)).to.contain('stop')
    expect(trivia('help', client, message)).to.contain('prop')
  })
})
