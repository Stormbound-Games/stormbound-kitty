describe('Routes — Calculators', () => {
  it('it should render the brawl calculator', () => {
    cy.visit('/calculators/brawl').get('main h1').should('exist')
  })

  it('it should render the value calculator', () => {
    cy.visit('/calculators/value').get('main h1').should('exist')
  })

  it('it should render the books calculator', () => {
    cy.visit('/calculators/books').get('main h1').should('exist')
  })

  it('it should render the income calculator', () => {
    cy.visit('/calculators/income').get('main h1').should('exist')
  })
})
