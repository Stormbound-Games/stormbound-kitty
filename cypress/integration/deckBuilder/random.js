import s from './selectors'
import getRawCardData from '../../../src/helpers/getRawCardData'

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
      .find('.Deck__name')
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
        expect($card).to.satisfy(
          $card =>
            ($card.hasClass('Deck__card--winter') ||
              $card.hasClass('Deck__card--neutral')) &&
            !(
              $card.hasClass('Deck__card--ironclad') ||
              $card.hasClass('Deck__card--swarm') ||
              $card.hasClass('Deck__card--shadowfen')
            )
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
      .filter('.Deck__card--winter')
      .then($cards => expect($cards.length).to.be.at.least(6))
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
        expect(getRawCardData($card.attr('data-testid')).rarity).to.not.equal(
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
        expect(getRawCardData($card.attr('data-testid')).rarity).to.not.equal(
          'legendary'
        )
      })
  })
})
