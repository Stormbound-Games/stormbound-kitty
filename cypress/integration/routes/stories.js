import { STORY_CATEGORIES } from '../../../src/constants/stories'

describe('Routes — Stories', () => {
  Object.keys(STORY_CATEGORIES).forEach(category => {
    it(`it should render the ${category} page`, () => {
      cy.visit('/stories/' + category)
        .get('main h1')
        .should('be.visible')
    })
  })

  it('should render a story', () => {
    cy.visit('/stories/lore/sisters-pact').get('main h1').should('exist')
  })
})
