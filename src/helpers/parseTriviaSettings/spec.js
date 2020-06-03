import parseTriviaSettings from './'

describe('The `parseTriviaSettings` helper', () => {
  it('should return an empty object if no mode found', () => {
    expect(parseTriviaSettings('')).to.deep.equal({})
    expect(parseTriviaSettings('azrty')).to.deep.equal({})
  })

  it('should properly resolve the game mode', () => {
    expect(parseTriviaSettings('card').mode).to.equal('CARD')
    expect(parseTriviaSettings('question').mode).to.equal('QUESTION')
  })

  it('should properly resolve the duration for card mode', () => {
    expect(parseTriviaSettings('card 60').duration).to.equal(60)
    expect(parseTriviaSettings('60 card').duration).to.equal(60)
    expect(parseTriviaSettings('card 10').duration).to.equal(30)
    expect(parseTriviaSettings('card 300').duration).to.equal(120)
  })

  it('should properly resolve the duration for question mode', () => {
    expect(parseTriviaSettings('question').duration).to.equal(10)
    expect(parseTriviaSettings('question 15').duration).to.equal(15)
    expect(parseTriviaSettings('15 question').duration).to.equal(15)
    expect(parseTriviaSettings('question 1').duration).to.equal(5)
    expect(parseTriviaSettings('question 100').duration).to.equal(20)
  })

  it('should properly resolve the difficulty', () => {
    expect(parseTriviaSettings('question easy').difficulty).to.equal('EASY')
    expect(parseTriviaSettings('question medium').difficulty).to.equal('MEDIUM')
    expect(parseTriviaSettings('question hard').difficulty).to.equal('HARD')
    expect(parseTriviaSettings('easy question').difficulty).to.equal('EASY')
    expect(parseTriviaSettings('medium question').difficulty).to.equal('MEDIUM')
    expect(parseTriviaSettings('hard question').difficulty).to.equal('HARD')
  })
})
