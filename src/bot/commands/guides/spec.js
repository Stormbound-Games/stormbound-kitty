import GUIDES from '../../../data/guides'
import command from './'
const guides = command.handler

describe('Bot — !guides', () => {
  it('should return all guides', () => {
    GUIDES.forEach(guide => {
      expect(guides()).to.contain(guide.name)
      guide.authors.forEach(author => expect(guides()).to.contain(author))
      expect(guides()).to.contain(guide.slug)
    })
  })
})
