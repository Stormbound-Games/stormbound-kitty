describe('Routes — Changelog', () => {
  it('it should render the card changes', () => {
    cy.visit('/changelog/cards').get('main h1').should('exist')
  })

  it('it should render the index', () => {
    cy.visit('/changelog/releases').get('main h1').should('exist')
  })

  it('it should render July 2020 update', () => {
    cy.visit('/changelog/07-2020').get('main h1').should('exist')
  })

  it('it should render September 2020 update', () => {
    cy.visit('/changelog/09-2020').get('main h1').should('exist')
  })
})
