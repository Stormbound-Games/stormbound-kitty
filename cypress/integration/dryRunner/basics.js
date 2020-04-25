import s from './selectors'
import cards from '../../../src/data/cards'

const showsDrawingChance = value => {
  return /\(in hand\)/.test(value) || /\([\d.]+%\)/.test(value)
}

const unselectActiveCard = ($wrapper, index) => {
  if ($wrapper.hasClass('DryRunnerHand__wrapper--active')) {
    cy.drSelect(index)
  }
}

const isMarkedAffordable = $card => {
  const id = $card.attr('id')
  const { mana } = cards.find(card => card.id === id)
  const assert = mana <= 3 ? 'have.class' : 'not.have.class'

  cy.wrap($card).should(assert, 'Card--affordable')
}

describe('Dry-runner — Basics', () => {
  const CHEAP_DECK =
    'NU4xLDVOMiw1RjMsNU4zLDVOMjMsNU40LDVONSw1TjYsNU42Miw1TjY3LDVONjYsNU4xNg=='
  const EXPENSIVE_DECK =
    'Mk42OCw0TjQ3LDNONDgsNE40OSwyTjUwLDNONTEsNE41MiwzTjUzLDVONTQsMk41NSwyTjU2LDNONTc='

  before(() => {
    cy.visit(`/deck/${CHEAP_DECK}/dry-run`)
  })

  afterEach(() => {
    cy.get(s.CARD).parent().each(unselectActiveCard)
  })

  it('should have a correct default state', () => {
    cy.get(s.MANA).should('contain', 3).get(s.CARD).should('have.length', 4)
  })

  it('should be possible to display drawing chances', () => {
    cy.get(s.DECK_CARD)
      .each($card => expect($card.text()).not.to.satisfy(showsDrawingChance))
      .get(s.CHANCES_CHECKBOX)
      .check()
      .get(s.DECK_CARD)
      .each($card => expect($card.text()).to.satisfy(showsDrawingChance))
  })

  it('should mark playable cards as such', () => {
    cy.get(s.CARD).each(isMarkedAffordable)
  })

  it('should be possible to cycle a single card', () => {
    cy.drCycle(0)

      .get('@card')
      .should('not.exist')

      .get(s.CARD)
      .should('have.length', 4)

      .drSelect(0)

      .get(s.CYCLE_BTN)
      .and('be.disabled')
  })

  it('should be possible to play an affordable card', () => {
    cy.drPlay(0)

      .get('@card')
      .should('not.exist')

      .get(s.CARD)
      .should('have.length', 3)
  })

  it('should be possible to end turn', () => {
    cy.drEndTurn()

      .get(s.MANA)
      .should('contain', 4)

      .get(s.CARD)
      .should('have.length', 4)
  })

  it('should not be possible to play a card costing too much mana', () => {
    cy.visit(`/deck/${EXPENSIVE_DECK}/dry-run`)

      .drSelect(0)

      .get(s.PLAY_BTN)
      .and('be.disabled')
  })
})
