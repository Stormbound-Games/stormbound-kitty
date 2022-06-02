describe('Members page', () => {
  before(() => cy.clearLocalStorageSnapshot())
  beforeEach(() => cy.restoreLocalStorage())
  afterEach(() => cy.saveLocalStorage())

  it('should be possible to record oneself', () => {
    cy.visit('/members')
    cy.get('#user-name-input').type('Kitt{enter}', { force: true })
    cy.get('#user-name')
      .find('[class$="-singleValue"]')
      .should('contain', 'Kitty')
  })

  it('should be preserved upon reload', () => {
    cy.reload()
    cy.get('#user-name')
      .find('[class$="-singleValue"]')
      .should('contain', 'Kitty')
  })

  it('should be reflected in one’s feed', () => {
    cy.visit('/members/kitty')
    cy.get('h1').contains('Activity Feed')
  })
})
