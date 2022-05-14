import s from './selectors'

const assertCardImage = (index, image) =>
  cy
    .get(s.CARD_PREVIEW)
    .eq(index)
    .find(s.CARD_IMAGE)
    .should('have.attr', 'src', image)

describe('Card Builder — Image', () => {
  before(() => {
    cy.visit('/card')
  })

  it('should be empty by default', () => {
    cy.get(s.IMAGE_SELECT)
      .find('.CardSelect__single-value')
      .should('have.text', 'Pick a card')
  })

  it('should be possible to pick a card’s image', () => {
    cy.get(s.IMAGE_SELECT)
      .find('input')
      .first()
      .type('Restl{enter}', { force: true })
    cy.get(s.IMAGE_SELECT)
      .find('.CardSelect__single-value')
      .should('contain', 'Restless Goats')
    assertCardImage(
      0,
      'https://cdn.sanity.io/images/5hlpazgd/production/acd2a07b8a65b920b41af9b63bcbdbb19f6429a0-512x512.png?auto=format&w=300&q=90'
    )
  })

  it.skip('should be preserved upon reload', () => {
    cy.url().should('not.match', /\/card$/)
    cy.reload()
    assertCardImage(
      0,
      'https://cdn.sanity.io/images/5hlpazgd/production/acd2a07b8a65b920b41af9b63bcbdbb19f6429a0-512x512.png?auto=format&w=300&q=90'
    )
  })

  it('should be possible to define a custom image', () => {
    cy.get(s.IMAGE_INPUT).type('https://i.imgur.com/nLtdfAg.png', { delay: 0 })
    assertCardImage(0, 'https://i.imgur.com/nLtdfAg.png')
  })

  it('should display an error if it’s not an image', () => {
    cy.get(s.IMAGE_INPUT).clear().paste('https://imgur.com/nLtdfAg')
    cy.get('#image-error-dialog').should('be.visible')
  })
})
