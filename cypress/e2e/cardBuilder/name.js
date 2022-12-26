import s from './selectors'

const assertCardName = (index, name) =>
  cy.get(s.CARD_PREVIEW).eq(index).find(s.CARD_NAME).should('have.text', name)

describe('Card Builder — Name', () => {
  let id = ''

  beforeEach(() => cy.visit('/card/' + id))

  afterEach(() =>
    cy.url().then(url => {
      let last = url.split('/').pop()
      if (last !== 'card') id = last
    })
  )

  it('should be possible to define the card name', () => {
    cy.get(s.NAME_INPUT).should('be.empty')
    cy.get(s.NAME_INPUT)
      .should('be.visible')
      .type('Kitty Sparkles')
      .should('have.value', 'Kitty Sparkles')
    assertCardName(0, 'Kitty Sparkles')
  })

  it('should be preserved upon reload', () => {
    cy.get(s.NAME_INPUT).should('have.value', 'Kitty Sparkles')
    assertCardName(0, 'Kitty Sparkles')
  })
})
