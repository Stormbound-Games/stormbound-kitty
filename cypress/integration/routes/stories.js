import { FACTIONS } from '../../../src/constants/game'
import stories from '../../../src/data/stories'

describe('Routes — Stories', () => {
  it('it should render the index', () => {
    cy.visit('/stories').get('.Banner').should('be.visible')
  })
  ;['lore', ...Object.keys(FACTIONS)].forEach(category => {
    it(`it should render the ${category} page`, () => {
      cy.visit('/stories/' + category)
        .get('main h1')
        .should('exist')
    })
  })

  stories.forEach(story => {
    const id = window.btoa(encodeURIComponent(story.title + '-' + story.author))

    it(`it should render the ${id} story`, () => {
      cy.visit('/stories/' + id)
        .get('main h1')
        .should('exist')
    })
  })
})
