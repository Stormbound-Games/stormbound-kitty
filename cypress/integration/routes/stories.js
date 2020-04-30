import { FACTIONS } from '../../../src/constants/game'
import stories from '../../../src/data/stories'

describe('Routes — Stories', () => {
  ;['lore', ...Object.keys(FACTIONS)].forEach(category => {
    it(`it should render the ${category} page`, () => {
      cy.visit('/stories/' + category)
        .get('main h1')
        .should('exist')
    })
  })

  it(`it should a story`, () => {
    cy.visit('/stories/' + stories[0].id)
      .get('main h1')
      .should('exist')
  })
})
