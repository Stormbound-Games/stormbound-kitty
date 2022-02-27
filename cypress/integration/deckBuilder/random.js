import s from './selectors'
import cardsIndex from '../../fixtures/cards'

describe('Deck Builder — Random deck', () => {
  before(() => {
    cy.visit('/deck')
  })

  afterEach(() => {
    cy.dbReset()
  })

  it('should be possible to generate a random deck', () => {
    cy.get(s.RANDOM_BTN)
      .click()
      .get(s.RANDOM_DIALOG)
      .should('be.visible')
      .get(s.RANDOM_DIALOG_CONFIRM)
      .click()
      .get(s.DECK_CARD)
      .should('have.length', 12)
  })

  it('should be possible to select a specific faction', () => {
    cy.get(s.RANDOM_BTN)
      .click()
      .get(s.RANDOM_DIALOG)
      .should('be.visible')
      .get(s.RANDOM_FACTION_SELECT)
      .select('winter')
      .get(s.RANDOM_DIALOG_CONFIRM)
      .click()
      .get(s.DECK_CARD)
      .each($card => {
        const id = $card.attr('data-testid').replace('deck-slot', '').trim()

        expect(cardsIndex[id].faction).to.satisfy(faction =>
          ['winter', 'neutral'].includes(faction)
        )
      })
  })

  it('should be possible to specify a min amount of faction cards', () => {
    cy.get(s.RANDOM_BTN)
      .click()
      .get(s.RANDOM_DIALOG)
      .should('be.visible')
      .get(s.RANDOM_FACTION_SELECT)
      .select('winter')
      .get(s.RANDOM_MIN_FACTION_SELECT)
      .select('6')
      .get(s.RANDOM_DIALOG_CONFIRM)
      .click()
      .get(s.DECK_CARD)
      .then($cards => {
        const winterCards = $cards
          .map((_, card) =>
            card.getAttribute('data-testid').replace('deck-slot', '').trim()
          )
          .map((_, id) => cardsIndex[id])
          .filter((_, card) => card.faction === 'winter')

        expect(winterCards.length).to.be.at.least(6)
      })
  })

  it('should be possible to specify a max amount of epic cards', () => {
    cy.get(s.RANDOM_BTN)
      .click()
      .get(s.RANDOM_DIALOG)
      .should('be.visible')
      .get(s.RANDOM_MAX_EPIC_SELECT)
      .select('0')
      .get(s.RANDOM_DIALOG_CONFIRM)
      .click()
      .get(s.DECK_CARD)
      .each($card => {
        expect(cardsIndex[$card.attr('data-testid')].rarity).to.not.equal(
          'epic'
        )
      })
  })

  it('should be possible to specify a max amount of legendary cards', () => {
    cy.get(s.RANDOM_BTN)
      .click()
      .get(s.RANDOM_DIALOG)
      .should('be.visible')
      .get(s.RANDOM_MAX_LEGENDARY_SELECT)
      .select('0')
      .get(s.RANDOM_DIALOG_CONFIRM)
      .click()
      .get(s.DECK_CARD)
      .each($card => {
        expect(cardsIndex[$card.attr('data-testid')].rarity).to.not.equal(
          'legendary'
        )
      })
  })
})
