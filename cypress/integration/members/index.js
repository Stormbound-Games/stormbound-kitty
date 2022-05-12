describe('Members page', () => {
  before(() => cy.clearLocalStorageSnapshot())
  beforeEach(() => cy.restoreLocalStorage())
  afterEach(() => cy.saveLocalStorage())

  it('should be possible to record oneself', () => {
    cy.visit('/members')
      .get('#user-name')
      .find('input')
      .first()
      .type('Kitt', { force: true })
      .type('{enter}', { force: true })
      .get('#user-name')
      .find('[class$="-singleValue"]')
      .should('contain', 'Kitty')
  })

  it('should be preserved upon reload', () => {
    cy.reload()
      .get('#user-name')
      .find('[class$="-singleValue"]')
      .should('contain', 'Kitty')
  })

  it('should be reflected in one’s feed', () => {
    cy.visit('/members/kitty').get('h1').contains('Activity Feed')
  })
})
