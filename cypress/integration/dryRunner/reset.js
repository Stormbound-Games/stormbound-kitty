import s from './selectors'

const DECK_ID = '5n15n25n35n235n45n55n625s35n145w125w104w19'
const HAND = ['N14', 'W10', 'W12', 'W19']

describe('Dry-runner — Reset', () => {
  before(() => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`).drDrawHand(HAND)
  })

  it('should be able to reset a game', () => {
    cy.drPlay('N14')
    cy.drCycle('W10')
    cy.drEndTurn(3)
    cy.drReset()
    cy.get(s.MANA).should('contain', 3)
    cy.get('.DryRunnerHand__wrapper--active').should('not.exist')
    cy.get(s.CARD_LOG).find('img').should('have.length', 0)
  })

  it('should be able to reset a game in equals mode', () => {
    cy.drReset({ equals: true })
    cy.get(s.DECK_CARD)
      .find('[data-testid="deck-card-level"]')
      .should('contain', 1)
  })

  it('should be able to reset a game with a brawl modifier', () => {
    cy.drEndTurn()
    cy.drReset({ modifier: 'SPELL_MANA' })
    cy.get(s.MANA).should('contain', 3)
  })

  it('should not reset the draw chances checkbox', () => {
    cy.get(s.CHANCES_CHECKBOX).check()
    cy.drReset()
    cy.get(s.CHANCES_CHECKBOX).should('be.checked')
  })

  it('should not reset the RNG setting', () => {
    cy.drSetRNG('UNFRIENDLY')
    cy.drReset({ modifier: 'STRUCTURE_MANA' })
    cy.get(s.RNG_INPUT).filter(`[value="UNFRIENDLY"]`).should('be.checked')
  })
})
