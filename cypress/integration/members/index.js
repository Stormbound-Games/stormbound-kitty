describe('Members page', () => {
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
      .saveLocalStorage()
  })

  it('should be preserved upon reload', () => {
    cy.restoreLocalStorage()
      .reload()
      .get('#user-name')
      .find('[class$="-singleValue"]')
      .should('contain', 'Kitty')
      .saveLocalStorage()
  })

  it('should be reflected in one’s feed', () => {
    cy.restoreLocalStorage()
      .visit('/members/kitty')
      .get('h1')
      .contains('Activity Feed')
  })
})
