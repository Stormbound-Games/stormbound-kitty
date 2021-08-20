import parseTriviaSettings from './'

describe('The `parseTriviaSettings` helper', () => {
  it('should return an empty object if no mode found', () => {
    expect(parseTriviaSettings('')).toEqual({})
    expect(parseTriviaSettings('azrty')).toEqual({})
  })

  it('should properly resolve the game mode', () => {
    expect(parseTriviaSettings('card').mode).toEqual('CARD')
    expect(parseTriviaSettings('question').mode).toEqual('QUESTION')
  })

  it('should properly resolve the duration for card mode', () => {
    expect(parseTriviaSettings('card 60').duration).toEqual(60)
    expect(parseTriviaSettings('60 card').duration).toEqual(60)
    expect(parseTriviaSettings('card 10').duration).toEqual(30)
    expect(parseTriviaSettings('card 300').duration).toEqual(120)
  })

  it('should properly resolve the duration for image mode', () => {
    expect(parseTriviaSettings('image 60').duration).toEqual(60)
    expect(parseTriviaSettings('60 image').duration).toEqual(60)
    expect(parseTriviaSettings('image 10').duration).toEqual(30)
    expect(parseTriviaSettings('image 300').duration).toEqual(120)
  })

  it('should properly resolve the duration for question mode', () => {
    expect(parseTriviaSettings('question').duration).toEqual(15)
    expect(parseTriviaSettings('question 12').duration).toEqual(12)
    expect(parseTriviaSettings('12 question').duration).toEqual(12)
    expect(parseTriviaSettings('question 1').duration).toEqual(8)
    expect(parseTriviaSettings('question 100').duration).toEqual(20)
  })
})
