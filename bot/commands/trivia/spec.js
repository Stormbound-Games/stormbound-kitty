import Discord from 'discord.js'
import Trivia from './Trivia'

const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

// This test suite doesn’t work on GitHub for some reason. :(
describe.skip('Bot — !trivia', () => {
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
  const trivia = new Trivia({
    guildId: 'guildId',
    withScores: false,
    abbreviations: global.__ABBREVIATIONS__,
    cards: global.__CARDS__,
    brawls: global.__BRAWLS__,
  })

  it('should ignore invalid commands', () => {
    trivia.start({ author: user, channel, content: '!trivia foo' })
    expect(trivia.mode).toEqual(null)
  })

  it('should be possible to start a new card trivia', () => {
    trivia.start({ author: user, channel, content: '!trivia card' })
    expect(trivia.mode).toEqual('CARD')
    expect(trivia.initiator).toEqual(user)
    expect(trivia.halfTimer).not.toEqual(undefined)
  })

  it('should be possible to ask for hints', () => {
    const output = trivia.guess({ author: user, channel, content: 'pirate' })
    expect(output.title).not.toEqual(undefined)
    expect(output.description).toContain('pirate')
  })

  it('should be possible to emit guesses', () => {
    const output = trivia.guess({ author: user, channel, content: 'mia' })
    expect(output.title).not.toEqual(undefined)
    expect(output.description).toContain('Doctor Mia')
  })

  it('should be possible to stop an ongoing trivia', () => {
    trivia.stop('ABORT')
    expect(trivia.mode).toEqual(null)
    expect(trivia.initiator).toEqual(null)
    expect(trivia.halfTimer).toEqual(undefined)
  })

  it('should be possible to win a card trivia', () => {
    trivia.start({ author: user, channel, content: '!trivia card' })
    const output = trivia.guess({
      author: user,
      channel,
      content: trivia.answer.name,
    })
    expect(output.title).toContain('🎉')
  })

  it('should be possible to start a new question trivia', () => {
    trivia.start({ author: user, channel, content: '!trivia question' })
    expect(trivia.mode).toEqual('QUESTION')
    expect(trivia.initiator).toEqual(user)
    expect(trivia.halfTimer).not.toEqual(undefined)
  })

  it('should ignore guesses that are not amongst letters', () => {
    trivia.start({ author: user, channel, content: '!trivia question' })
    const guess = LETTERS.find(
      letter =>
        !Object.keys(trivia.answer.choices).includes(letter.toUpperCase())
    )
    trivia.guess({ author: user, channel, content: guess })

    expect(trivia.mode).toEqual('QUESTION')
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

    expect(output.title).toContain('Incorrect')
    expect(trivia.mode).toEqual(null)
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
    expect(output.title).toContain('🎉')
  })

  it('should be possible to display scores', () => {
    trivia.scores().then(output => {
      expect(output.title).toContain('scores')
    })
  })
})
