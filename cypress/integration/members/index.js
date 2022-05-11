describe('Members page', () => {
  before(() => {
    cy.clearLocalStorageSnapshot()
  })

  beforeEach(() => {
    cy.restoreLocalStorage()
    cy.visit('/members')
  })

  afterEach(() => {
    cy.saveLocalStorage()
  })

  it('should be possible to record oneself', () => {
    cy.get('#user-name')
      .should('be.visible')
      .find('input')
      .first()
      .type('Kitt', { force: true })
      .type('{enter}', { force: true })
      .get('#user-name')
      .find('[class$="-singleValue"]')
      .should('contain', 'Kitty')
  })

  it('should be preserved upon reload', () => {
    cy.get('#user-name')
      .should('be.visible')
      .find('[class$="-singleValue"]')
      .should('contain', 'Kitty')
      .saveLocalStorage()
  })

  it('should be reflected in one’s feed', () => {
    cy.visit('/members/kitty').get('h1').contains('Activity Feed')
  })
})
