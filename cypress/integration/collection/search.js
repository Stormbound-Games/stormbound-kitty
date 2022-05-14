import s from './selectors'

describe('Collection — Search', () => {
  before(() => {
    cy.visit('/collection')
  })

  beforeEach(() => {
    cy.get(s.RESET_BTN).then($button => {
      if (!$button.is(':disabled')) cy.wrap($button).click()
    })
  })

  it('should be able to filter by faction', () => {
    cy.get(s.FACTION_SELECT).select('ironclad')
    cy.get(s.CARD).should('have.attr', 'data-faction', 'ironclad')
  })

  it('should be able to filter by status', () => {
    cy.get(s.STATUS_SELECT).select('MISSING')
    cy.get(s.CARD).should('have.length', 0)
  })

  it('should be able to filter by level', () => {
    cy.get(s.LEVEL_SELECT).select('2')
    cy.get(s.CARD).should('have.length', 0)
  })

  it('should be able to filter by rarity', () => {
    cy.get(s.RARITY_SELECT).select('epic')
    cy.get(s.CARD)
      .find(s.CARD_RARITY)
      .each($node => {
        expect($node.attr('alt')).to.equal('epic')
      })
  })

  it('should be able to filter by name', () => {
    cy.get(s.NAME_INPUT).type('Kitten')
    cy.get(s.CARD).should('have.length', 1)
  })
})
