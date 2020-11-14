import { CATEGORIES } from '../../../src/constants/guides'
import guides from '../../../src/data/guides'

describe('Routes — Guides', () => {
  Object.keys(CATEGORIES).forEach(category => {
    it(`it should render the ‘${CATEGORIES[category].name.short}’ category`, () => {
      cy.visit('/guides/' + CATEGORIES[category].slug)
        .get('h1')
        .should('be.visible')
    })
  })

  guides.forEach(guide => {
    it(`it should render the ‘${guide.name}’ guide`, () => {
      cy.visit('/guides/' + guide.slug)
        .get('h1')
        .should('be.visible')
    })
  })
})
