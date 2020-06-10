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

  it('should properly resolve the duration for image mode', () => {
    expect(parseTriviaSettings('image 60').duration).to.equal(60)
    expect(parseTriviaSettings('60 image').duration).to.equal(60)
    expect(parseTriviaSettings('image 10').duration).to.equal(30)
    expect(parseTriviaSettings('image 300').duration).to.equal(120)
  })

  it('should properly resolve the duration for question mode', () => {
    expect(parseTriviaSettings('question').duration).to.equal(15)
    expect(parseTriviaSettings('question 12').duration).to.equal(12)
    expect(parseTriviaSettings('12 question').duration).to.equal(12)
    expect(parseTriviaSettings('question 1').duration).to.equal(8)
    expect(parseTriviaSettings('question 100').duration).to.equal(20)
  })
})
