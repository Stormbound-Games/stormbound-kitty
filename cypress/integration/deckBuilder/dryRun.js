import s from './selectors'
import cards from '../../../src/data/cards'

const showsDrawingChance = value => {
  return /\(in hand\)/.test(value) || /\([\d.]+%\)/.test(value)
}

describe('Deck Builder — Dry-run', () => {
  before(() => {
    cy.visit(
      '/deck/NU4xLDVOMiw1RjMsNU4zLDVONCw0TjUsNE42LDJONjIsMk42NywyTjY2LDVOMTIsNU4xNg==/dry-run'
    )
  })

  it('should start with 3 mana', () => {
    cy.get(s.DR_MANA).should('contain', 3)
  })

  it('should be possible to display drawing chances', () => {
    cy.get(s.DR_DECK_CARD)
      .each($card => expect($card.text()).not.to.satisfy(showsDrawingChance))
      .get(s.DR_CHANCES_CHECKBOX)
      .check()
      .get(s.DR_DECK_CARD)
      .each($card => expect($card.text()).to.satisfy(showsDrawingChance))
  })

  it('should mark playable cards as such', () => {
    cy.get(s.DR_CARD).each($card => {
      const id = $card.attr('id')
      const { mana } = cards.find(card => card.id === id)
      const assert = mana <= 3 ? 'have.class' : 'not.have.class'

      cy.wrap($card).should(assert, 'Card--affordable')
    })
  })

  it('should be possible to cycle a card', () => {
    cy.get(s.DR_CARD)
      .first()
      .then($card => {
        const id = $card.attr('id')

        cy.wrap($card)
          .prev('button')
          .click()
          .get(s.DR_CYCLE_BTN)
          .should('be.visible')
          .and('not.be.disabled')
          .click()
          .get('#' + id)
          .should('not.exist')
      })
  })

  it('should be possible to play a card', () => {
    cy.get(s.DR_CARD)
      .first()
      .then($card => {
        const id = $card.attr('id')
        const { mana } = cards.find(card => card.id === id)

        cy.wrap($card)
          .prev('button')
          .click()
          .get(s.DR_PLAY_BTN)
          .should('be.visible')
          .and('not.be.disabled')
          .click()
          .get('#' + id)
          .should('not.exist')
          .get(s.DR_MANA)
          .should('contain', 3 - mana)
      })
  })

  it('should be possible to end turn', () => {
    cy.get(s.DR_END_TURN_BTN).click().get(s.DR_MANA).should('contain', 4)
  })
})
