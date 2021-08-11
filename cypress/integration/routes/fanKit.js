describe('Routes — Fan-Kit', () => {
  it('should render the index page', () => {
    cy.visit('/fan-kit').get('main h1').should('exist')
  })

  it('should render the avatars page', () => {
    cy.visit('/fan-kit/avatars').get('main h1').should('exist')
  })

  it('should render the backgrounds page', () => {
    cy.visit('/fan-kit/backgrounds').get('main h1').should('exist')
  })

  it('should render the books page', () => {
    cy.visit('/fan-kit/books').get('main h1').should('exist')
  })

  it('should render the cards page', () => {
    cy.visit('/fan-kit/cards').get('main h1').should('exist')
  })

  it('should render the wallpapers page', () => {
    cy.visit('/fan-kit/wallpapers').get('main h1').should('exist')
  })

  it('should render the fan-art page', () => {
    cy.visit('/fan-art').get('main h1').should('exist')
  })
})
