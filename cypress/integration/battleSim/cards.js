import s from './selectors'

describe('Battle Simulator — Cards', () => {
  before(() => {
    cy.visit('/simulators/battle')
  })

  it('should be possible to add a card in hand', () => {
    cy.bsDraw({ slot: 1, card: 'Zhev' })
      .get(s.CARD_SLOT_1)
      .should('not.be.empty')
  })

  it('should be preserved upon reload', () => {
    cy.url()
      .should('not.match', /battle$/)
      .reload()
      .get(s.CARD_SLOT_1)
      .should('not.be.empty')
      .get(s.CARDS_FORM_DISPLAY_1)
      .should('have.text', 'Spellbinder Zhevana')
      .get(s.CARDS_FORM_LEVEL_1)
      .should('have.value', '1')
  })

  it('should be possible to update the level of a card in hand', () => {
    cy.get(s.CARDS_FORM_LEVEL_1)
      .select('5')
      .get(s.CARD_SLOT_1)
      .find(s.CARD_LEVEL)
      .should('contain', '5')
  })

  it('should mark affordable cards in regard to mana', () => {
    cy.get(s.CARD_SLOT_1)
      .find(s.CARD)
      .should('not.have.attr', 'data-affordable')
      .bsDraw({ slot: 2, card: 'Summon' })
      .get(s.CARD_SLOT_2)
      .find(s.CARD)
      .should('have.attr', 'data-affordable')
  })

  it('should handle token cards differently', () => {
    cy.bsDraw({ slot: 3, card: 'Token' })
      .get(s.CARDS_FORM_LEVEL_3)
      .should('not.exist')
      .get(s.CARDS_FORM_STRENGTH_3)
      .clear()
      .type('1')
      .get(s.CARD_SLOT_3)
      .find(s.CARD_STRENGTH)
      .should('have.text', '11')
      .get(s.CARD_SLOT_3)
      .find(s.CARD_LEVEL)
      .should('contain', 1)
  })

  it('should be possible to update a card in hand', () => {
    cy.get(s.CARD_SLOT_3)
      .find(s.CARD_NAME)
      .then($name => {
        const currentName = $name.text()

        cy.bsDraw({ slot: 3, card: 'Ubass' })
          .get(s.CARD_SLOT_3)
          .find(s.CARD_NAME)
          .invoke('text')
          .should('not.eq', currentName)
          .get(s.CARDS_FORM_STRENGTH_3)
          .should('not.exist')
          .get(s.CARDS_FORM_LEVEL_3)
          .should('have.value', '5')
      })
  })
})
