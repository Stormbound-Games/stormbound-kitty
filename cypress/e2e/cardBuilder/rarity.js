import s from './selectors'

const assertCardRarity = (index, rarity) =>
  cy
    .get(s.CARD_PREVIEW)
    .eq(index)
    .find(s.CARD_RARITY)
    .should('have.attr', 'alt', rarity)

describe('Card Builder — Rarity', () => {
  let id = ''

  beforeEach(() => cy.visit('/card/' + id))

  afterEach(() =>
    cy.url().then(url => {
      let last = url.split('/').pop()
      if (last !== 'card') id = last
    })
  )

  it('should be possible to define the card rarity', () => {
    cy.get(s.RARITY_SELECT).should('have.value', 'common')
    cy.get(s.RARITY_SELECT)
      .should('be.visible')
      .select('epic')
      .should('have.value', 'epic')
    assertCardRarity(0, 'epic')
  })

  it('should be preserved upon reload', () => {
    cy.get(s.RARITY_SELECT).should('have.value', 'epic')
    assertCardRarity(0, 'epic')
  })
})
