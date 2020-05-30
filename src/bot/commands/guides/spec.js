import GUIDES from '../../../data/guides'
import command from './'
const guides = command.handler

describe('Bot — !guides', () => {
  it('should return all guides', () => {
    GUIDES.filter(guide => guide.name !== 'Lexicon').forEach(guide => {
      expect(guides()).to.contain(guide.name)
      expect(guides()).to.contain(guide.author)
      expect(guides()).to.contain(guide.link)
    })
  })

  it('should omit the lexicon', () => {
    expect(guides()).to.not.contain('Lexicon')
  })
})
