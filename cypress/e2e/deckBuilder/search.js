import s from './selectors'

describe('Deck Builder — Search', () => {
  before(() => {
    cy.visit('/deck')
  })

  beforeEach(() => {
    cy.get(s.RESET_FILTERS_BTN).then($button => {
      if (!$button.is(':disabled')) cy.wrap($button).click()
    })
  })

  it('should be able to filter by faction', () => {
    cy.get(s.FACTION_SELECT).select('ironclad')
    cy.get(s.CARD).should('have.attr', 'data-faction', 'ironclad')
  })

  it('should be able to filter by type', () => {
    cy.get(s.TYPE_SELECT).select('spell')
    cy.get(s.CARD).should('have.attr', 'data-type', 'spell')
  })

  it('should be able to filter by mana', () => {
    cy.get(s.MANA_SELECT).select('6-7')
    cy.get(s.CARD)
      .find(s.CARD_MANA)
      .each($node => {
        const mana = Number($node.text())
        expect(mana).to.be.above(5)
        expect(mana).to.be.below(8)
      })
  })

  it('should be able to filter by movement', () => {
    cy.get(s.MOVEMENT_SELECT).select('2')
    cy.get(s.CARD)
      .find(s.CARD_MOVEMENT)
      .each($node => expect($node.text()).to.equal('2'))
  })

  it('should be able to filter by rarity', () => {
    cy.get(s.RARITY_SELECT).select('epic')
    cy.get(s.CARD).should('have.attr', 'data-rarity', 'epic')
  })

  it('should be able to filter by unit type', () => {
    cy.get(s.UNIT_TYPE_SELECT).select('rodent')
    cy.get(s.CARD).each($card =>
      expect($card.attr('data-unit-types')).to.contain('rodent')
    )
  })

  it('should be able to filter by ability', () => {
    cy.get(s.ABILITY_SELECT).select('VITALITY')
    cy.get(s.CARD)
      .find(s.CARD_ABILITY)
      .each($node => expect($node.text()).to.match(/vitali/i))
  })

  it('should be able to filter by name', () => {
    cy.get(s.NAME_INPUT).type('Kitten')
    cy.get(s.CARD).should('have.length', 1)
  })
})
