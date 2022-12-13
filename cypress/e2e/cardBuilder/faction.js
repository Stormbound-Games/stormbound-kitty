import s from './selectors'

const assertCardFaction = (index, faction) =>
  cy
    .get(s.CARD_PREVIEW)
    .eq(index)
    .find('[data-testid="card"]')
    .should('have.attr', 'data-faction', faction)

describe('Card Builder — Faction', () => {
  let id = ''

  beforeEach(() => cy.visit('/card/' + id))

  afterEach(() =>
    cy.url().then(url => {
      let last = url.split('/').pop()
      if (last !== 'card') id = last
    })
  )

  it('should be possible to update the card faction', () => {
    cy.get(s.FACTION_SELECT).should('have.value', 'neutral')
    cy.get(s.FACTION_SELECT)
      .should('be.visible')
      .select('ironclad')
      .should('have.value', 'ironclad')
    assertCardFaction(0, 'ironclad')
  })

  it('should be preserved upon reload', () => {
    cy.get(s.FACTION_SELECT).should('have.value', 'ironclad')
    assertCardFaction(0, 'ironclad')
  })
})
