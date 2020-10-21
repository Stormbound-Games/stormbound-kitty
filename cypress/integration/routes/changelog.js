describe('Routes — Changelog & Releases', () => {
  it('it should render the card changes', () => {
    cy.visit('/changelog').get('main h1').should('exist')
  })

  it('it should render the index', () => {
    cy.visit('/releases').get('main h1').should('exist')
  })

  it('it should render July 2020 update', () => {
    cy.visit('/releases/07-2020').get('main h1').should('exist')
  })

  it('it should render September 2020 update', () => {
    cy.visit('/releases/09-2020').get('main h1').should('exist')
  })

  it('it should render October 2020 update', () => {
    cy.visit('/releases/10-2020').get('main h1').should('exist')
  })
})
