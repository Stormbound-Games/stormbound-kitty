import s from './selectors'

const DECK_ID =
  'NU4xLDVOMiw1TjMsNU4yMyw1TjQsNU41LDVONiw1TjYyLDVOMTQsNVcxMiw1VzEwLDRXMTk'
const HAND = ['N14', 'W10', 'W12', 'W19']

describe('Dry-runner — Reset', () => {
  before(() => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`).drDrawHand(HAND)
  })

  it('should be able to reset a game', () => {
    cy.drPlay('N14')
      .drCycle('W10')
      .drEndTurn(3)

      .get(s.RESET_BTN)
      .click()

      .get(s.RESET_CONFIRM_BTN)
      .click()

      .get(s.CARD)
      .should('have.length', 4)
      .get(s.MANA)
      .should('contain', 3)
      .get('.DryRunnerHand__wrapper--active')
      .should('not.exist')
      .get(s.CARD_LOG)
      .find('img')
      .should('have.length', 0)
  })

  it('should be able to reset a game in equals mode', () => {
    cy.get(s.RESET_BTN)
      .click()

      .get(s.EQUALS_MODE_CHECKBOX)
      .check()

      .get(s.RESET_CONFIRM_BTN)
      .click()

      .get(s.DECK_CARD)
      .find('.Deck__level')
      .should('contain', 1)
  })

  it('should not reset the draw chances checkbox', () => {
    cy.get(s.CHANCES_CHECKBOX)
      .check()

      .get(s.RESET_BTN)
      .click()

      .get(s.RESET_CONFIRM_BTN)
      .click()

      .get(s.CHANCES_CHECKBOX)
      .should('be.checked')
  })
})
