import { FACTIONS } from '../../../src/constants/game'
import stories from '../../../src/data/stories'
import chapters from '../../../src/data/stories.easternHeat'

describe('Routes — Stories', () => {
  ;['lore', ...Object.keys(FACTIONS)].forEach(category => {
    it(`it should render the ${category} page`, () => {
      cy.visit('/stories/' + category)
        .get('main h1')
        .should('exist')
    })
  })

  it('it should render a story', () => {
    cy.visit('/stories/' + stories[0].id)
      .get('main h1')
      .should('exist')
  })

  it('it should render Eastern Heat', () => {
    cy.visit('/stories/eastern-heat').get('main h1').should('exist')

    chapters.forEach(chapter => {
      cy.visit('/stories/' + chapter.id)
        .get('main h1')
        .should('be.visible')
    })
  })
})
