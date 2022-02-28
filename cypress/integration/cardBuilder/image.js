import s from './selectors'

describe('Card Builder — Image', () => {
  const assertCardImage = (index, value) =>
    cy
      .get(s.CARD_PREVIEW)
      .eq(index)
      .find(s.CARD_IMAGE)
      .should('have.attr', 'src', value)

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
      .click({ force: true })
      .type('Restl', { force: true })
      .type('{enter}', { force: true })
      .get(s.IMAGE_SELECT)
      .find('.CardSelect__single-value')
      .should('contain', 'Restless Goats')
  })

  it('should be reflected in all preview', () => {
    for (let i = 0; i < 5; i++)
      assertCardImage(
        i,
        'https://cdn.sanity.io/images/5hlpazgd/production/acd2a07b8a65b920b41af9b63bcbdbb19f6429a0-512x512.png?auto=format'
      )
  })

  it('should be preserved upon reload', () => {
    cy.url()
      .should('not.match', /\/card$/)
      .reload()
    for (let i = 0; i < 5; i++)
      assertCardImage(
        i,
        'https://cdn.sanity.io/images/5hlpazgd/production/acd2a07b8a65b920b41af9b63bcbdbb19f6429a0-512x512.png?auto=format'
      )
  })

  it('should be possible to define a custom image', () => {
    cy.get(s.IMAGE_INPUT).type('https://i.imgur.com/nLtdfAg.png', { delay: 0 })
  })

  it('should be reflected in all preview', () => {
    for (let i = 0; i < 5; i++)
      assertCardImage(i, 'https://i.imgur.com/nLtdfAg.png')
  })
})
