import swcc from '../../../src/data/swcc'

describe('Routes — Card Builder', () => {
  it('it should render', () => {
    cy.visit('/card').get('main h1').should('exist')
  })

  it('it should render the contest page', () => {
    cy.visit('/card/contest').get('main h1').should('exist')
  })

  it('it should render the editor mode', () => {
    cy.visit('/card/' + swcc[0].winner.id)
      .get('main h1')
      .should('exist')
  })

  it('it should render official cards from their ID', () => {
    cy.visit('/card/N1').get('main h1').should('exist')
  })

  it('it should render official cards from their name', () => {
    cy.visit('/card/green_prototypes').get('main h1').should('exist')
  })

  it('it should render the display mode', () => {
    cy.visit('/card/' + swcc[0].winner.id + '/display')
      .get('main h1')
      .should('exist')
  })
})
