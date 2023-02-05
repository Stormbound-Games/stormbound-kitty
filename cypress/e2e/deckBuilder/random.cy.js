import s from './selectors'

describe('Deck Builder — Random deck', () => {
  beforeEach(() => cy.visit('/deck/1n1').dbReset())

  it('should be possible to generate a random deck', () => {
    cy.get(s.RANDOM_BTN).click().wait(1000)
    cy.get(s.RANDOM_DIALOG).should('be.visible')
    cy.get(s.RANDOM_DIALOG_CONFIRM).should('be.visible').click()
    cy.get(s.DECK_CARD).should('have.length', 12)
  })

  it('should be possible to select a specific faction', () => {
    cy.get(s.RANDOM_BTN).click().wait(1000)
    cy.get(s.RANDOM_DIALOG).should('be.visible')
    cy.get(s.RANDOM_FACTION_SELECT).should('not.be.disabled').select('winter')
    cy.get(s.RANDOM_DIALOG_CONFIRM).click()
    cy.get(s.DECK_CARD).each($card => {
      expect($card.attr('data-testid')).to.satisfy(
        testId => testId.includes('winter') || testId.includes('neutral')
      )
    })
  })

  it('should be possible to specify a min amount of faction cards', () => {
    cy.get(s.RANDOM_BTN).click().wait(1000)
    cy.get(s.RANDOM_DIALOG).should('be.visible')
    cy.get(s.RANDOM_FACTION_SELECT).should('not.be.disabled').select('winter')
    cy.get(s.RANDOM_MIN_FACTION_SELECT).select('6')
    cy.get(s.RANDOM_DIALOG_CONFIRM).click()
    cy.get(s.DECK_CARD).then($cards => {
      const winterCards = $cards
        .map((_, card) => card.getAttribute('data-testid'))
        .filter((_, testId) => testId.includes('winter'))

      expect(winterCards.length).to.be.at.least(6)
    })
  })

  it('should be possible to specify a max amount of epic cards', () => {
    cy.get(s.RANDOM_BTN).click().wait(1000)
    cy.get(s.RANDOM_MAX_EPIC_SELECT).should('not.be.disabled').select('0')
    cy.get(s.RANDOM_DIALOG_CONFIRM).should('be.visible').click()
    cy.get(s.DECK_CARD).each($card => {
      expect($card.attr('data-testid')).to.not.include('epic')
    })
  })

  it('should be possible to specify a max amount of legendary cards', () => {
    cy.get(s.RANDOM_BTN).click().wait(1000)
    cy.get(s.RANDOM_MAX_LEGENDARY_SELECT).should('be.visible').select('0')
    cy.get(s.RANDOM_DIALOG_CONFIRM).should('be.visible').click()
    cy.get(s.DECK_CARD).each($card => {
      expect($card.attr('data-testid')).to.not.include('legendary')
    })
  })
})
