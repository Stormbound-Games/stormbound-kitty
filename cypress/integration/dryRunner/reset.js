import s from './selectors'

const DECK_ID = '5n15n25n35n235n45n55n625s35n145w125w104w19'
const HAND = ['N14', 'W10', 'W12', 'W19']

describe('Dry-runner — Reset', () => {
  before(() => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`).drDrawHand(HAND)
  })

  it('should be able to reset a game', () => {
    cy.drPlay('N14')
      .drCycle('W10')
      .drEndTurn(3)

      .drReset()

      .get(s.MANA)
      .should('contain', 3)
      .get('.DryRunnerHand__wrapper--active')
      .should('not.exist')
      .get(s.CARD_LOG)
      .find('img')
      .should('have.length', 0)
  })

  it('should be able to reset a game in equals mode', () => {
    cy.drReset({ equals: true })
      .get(s.DECK_CARD)
      .find('[data-testid="deck-card-level"]')
      .should('contain', 1)
  })

  it('should be able to reset a game with a brawl modifier', () => {
    cy.drEndTurn()
      .drReset({ modifier: 'SPELL_MANA' })

      .get(s.MANA)
      .should('contain', 3)
  })

  it('should not reset the draw chances checkbox', () => {
    cy.get(s.CHANCES_CHECKBOX)
      .check()
      .drReset()

      .get(s.CHANCES_CHECKBOX)
      .should('be.checked')
  })

  it('should not reset the RNG setting', () => {
    cy.drSetRNG('UNFRIENDLY')
      .drReset({ modifier: 'STRUCTURE_MANA' })

      .get(s.RNG_INPUT)
      .filter(`[value="UNFRIENDLY"]`)
      .should('be.checked')
  })
})
