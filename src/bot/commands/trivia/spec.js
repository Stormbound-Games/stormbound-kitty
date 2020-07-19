import Discord from 'discord.js'
import Trivia from './Trivia'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

describe('Bot — !trivia', () => {
  const channelID = Discord.SnowflakeUtil.generate()
  const client = new Discord.Client()
  const guild = new Discord.Guild(client)
  const channel = new Discord.TextChannel(guild, {
    ...new Discord.GuildChannel(guild, {
      ...new Discord.Channel(client, { id: channelID }),
    }),
  })
  const user = new Discord.User(client, {
    id: '368097495605182483',
    username: 'Kitty ✨',
    discriminator: 'Kitty#1909',
    avatar: '<mock>',
    bot: false,
  })
  const trivia = new Trivia({ guildId: 'guildId', channel })

  it('should ignore invalid commands', () => {
    trivia.start({ author: user, channel, content: '!trivia foo' })
    expect(trivia.mode).to.equal(null)
  })

  it('should be possible to start a new card trivia', () => {
    trivia.start({ author: user, channel, content: '!trivia card' })
    expect(trivia.mode).to.equal('CARD')
    expect(trivia.initiator).to.equal(user)
    expect(trivia.halfTimer).to.not.equal(undefined)
  })

  it('should be possible to ask for hints', () => {
    const output = trivia.guess({ author: user, channel, content: 'pirate' })
    expect(output.title).to.not.equal(undefined)
    expect(output.description).to.contain('pirate')
  })

  it('should be possible to emit guesses', () => {
    const output = trivia.guess({ author: user, channel, content: 'mia' })
    expect(output.title).to.not.equal(undefined)
    expect(output.description).to.contain('Doctor Mia')
  })

  it('should be possible to stop an ongoing trivia', () => {
    trivia.stop('ABORT')
    expect(trivia.mode).to.equal(null)
    expect(trivia.initiator).to.equal(null)
    expect(trivia.halfTimer).to.equal(undefined)
  })

  it('should be possible to win a card trivia', () => {
    trivia.start({ author: user, channel, content: '!trivia card' })
    const output = trivia.guess({
      author: user,
      channel,
      content: trivia.answer.name,
    })
    expect(output.title).to.contain('🎉')
  })

  it('should be possible to start a new question trivia', () => {
    trivia.start({ author: user, channel, content: '!trivia question' })
    expect(trivia.mode).to.equal('QUESTION')
    expect(trivia.initiator).to.equal(user)
    expect(trivia.halfTimer).to.not.equal(undefined)
  })

  it('should ignore guesses that are not amongst letters', () => {
    trivia.start({ author: user, channel, content: '!trivia question' })
    const guess = LETTERS.find(
      letter =>
        !Object.keys(trivia.answer.choices).includes(letter.toUpperCase())
    )
    trivia.guess({ author: user, channel, content: guess })

    expect(trivia.mode).to.equal('QUESTION')
  })

  it('should interrupt question trivia after first incorrect guess', () => {
    trivia.start({ author: user, channel, content: '!trivia question' })
    const output = trivia.guess({
      author: user,
      channel,
      content: Object.keys(trivia.answer.choices).find(
        letter => trivia.answer.choices[letter] !== trivia.answer.name
      ),
    })

    expect(output.title).to.contain('Incorrect')
    expect(trivia.mode).to.equal(null)
  })

  it('should be possible to win a question trivia', () => {
    trivia.start({ author: user, channel, content: '!trivia question' })
    const output = trivia.guess({
      author: user,
      channel,
      content: Object.keys(trivia.answer.choices).find(
        letter => trivia.answer.choices[letter] === trivia.answer.name
      ),
    })
    expect(output.title).to.contain('🎉')
  })

  it('should be possible to display scores', () => {
    trivia.scores().then(output => {
      expect(output.title).to.contain('scores')
    })
  })
})
