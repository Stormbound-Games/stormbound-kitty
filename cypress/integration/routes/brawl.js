import { BRAWLS } from '../../../src/constants/brawl'

describe('Routes — Brawl', () => {
  it('it should render the index', () => {
    cy.visit('/brawl').get('main h1').should('exist')
  })

  BRAWLS.forEach(brawl => {
    it(`it should render ${brawl.id} page`, () => {
      cy.visit(`/brawl/${brawl.id.replace(/_/g, '-').toLowerCase()}`)
        .get('main h1')
        .should('exist')
    })
  })
})
