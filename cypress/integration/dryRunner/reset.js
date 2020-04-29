import s from './selectors'

const DECK_ID =
  'NU4xLDVOMiw1TjMsNU4yMyw1TjQsNU41LDVONiw1TjYyLDVOMTQsNVcxMiw1VzEwLDRXMTk'
const KNIGHTS_DECK =
  'MU4xLDFOMiwxTjMsMU43LDFONTksMU4yNywxTjI4LDFOMzIsMU40NywxTjU0LDFONTUsMU41Ng'

const STRUCTURES_DECK =
  'MUk1LDFOMTMsMVczLDFJMTAsMU4yMCwxSTE0LDFXMjQsMUYxMywxVzksMUkxOSwxTjM0LDFONDU'
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

      .get('#reset-dialog')
      .find(s.RESET_CONFIRM_BTN)
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
    cy.get(s.EQUALS_MODE_CHECKBOX)
      .check()

      .get('#equals-mode-dialog')
      .find(s.RESET_CONFIRM_BTN)
      .click()

      .get(s.DECK_CARD)
      .find('.Deck__level')
      .should('contain', 1)
  })

  it('should be able to reset a game with knight mana cost modifier', () => {
    cy.visit(`/deck/${KNIGHTS_DECK}/dry-run`)

      .get('.Mana__value')
      .then($cards => {
        const deckCost = Array.from($cards).reduce(
          (acc, $card, index) =>
            index < 12 ? acc + parseInt($card.innerText) : acc,
          0
        )

        cy.get(s.BRAWL_MODIFIER_SELECT)
          .select('KNIGHT_MANA')

          .get('#brawl-modifiers-dialog')
          .find(s.RESET_CONFIRM_BTN)
          .click()

          .get('.Mana__value')
          .then($cards => {
            const newDeckCost = Array.from($cards).reduce(
              (acc, $card, index) =>
                index < 12 ? acc + parseInt($card.innerText) : acc,
              0
            )
            expect(newDeckCost).to.eq(deckCost - 20)
          })
      })
  })

  it('should be able to reset a game with structure mana cost modifier', () => {
    cy.visit(`/deck/${STRUCTURES_DECK}/dry-run`)

      .get('.Mana__value')
      .then($cards => {
        const deckCost = Array.from($cards).reduce(
          (acc, $card, index) =>
            index < 12 ? acc + parseInt($card.innerText) : acc,
          0
        )

        cy.get(s.BRAWL_MODIFIER_SELECT)
          .select('STRUCTURE_MANA')

          .get('#brawl-modifiers-dialog')
          .find(s.RESET_CONFIRM_BTN)
          .click()

          .get('.Mana__value')
          .then($cards => {
            const newDeckCost = Array.from($cards).reduce(
              (acc, $card, index) =>
                index < 12 ? acc + parseInt($card.innerText) : acc,
              0
            )
            expect(newDeckCost).to.eq(deckCost - 24)
          })
      })
  })

  it('should not reset the draw chances checkbox', () => {
    cy.get(s.CHANCES_CHECKBOX)
      .check()

      .get(s.RESET_BTN)
      .click()

      .get('#reset-dialog')
      .find(s.RESET_CONFIRM_BTN)
      .click()

      .get(s.CHANCES_CHECKBOX)
      .should('be.checked')
  })
})
