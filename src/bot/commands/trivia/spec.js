import command from './'
const trivia = command.handler

const channel = { id: 'channel_id', guild: { id: 'guild_id' } }
const author = { id: 'author_id', username: 'Author' }
const message = { channel, author }

describe('Bot — !trivia', () => {
  it('should return nothing for a missing term', () => {
    expect(trivia('', null, message)).to.equal(undefined)
  })

  it('should be possible to start a trivia', () => {
    expect(trivia('start', null, message)).to.contain('started')
  })

  it('should not be possible to start a trivia if one started', () => {
    expect(trivia('start', null, message)).to.equal(undefined)
  })

  it('should not be possible to stop someone else’s trivia', () => {
    const author = { id: 'other_author_id', username: 'Other Author' }
    const message = { channel, author }
    expect(trivia('stop', null, message)).to.equal(undefined)
  })

  it('should be possible to ask for hints', () => {
    expect(trivia('is struct', null, message)).to.contain('type')
    expect(trivia('is pirate', null, message)).to.contain('race')
    expect(trivia('is rare', null, message)).to.contain('rarity')
    expect(trivia('is wp', null, message)).to.contain('faction')
    expect(trivia('is hero', null, message)).to.contain('hero')
    expect(trivia('is elder', null, message)).to.contain('elder')
  })

  it('should be possible to stop one’s own trivia', () => {
    expect(trivia('stop', null, message)).to.contain('ending')
  })

  it('should not be possible to stop a trivia if no trivia started', () => {
    expect(trivia('stop', null, message)).to.equal(undefined)
  })

  it('should be possible to display help', () => {
    expect(trivia('help', null, message)).to.contain('start')
    expect(trivia('help', null, message)).to.contain('stop')
    expect(trivia('help', null, message)).to.contain('is')
  })
})
