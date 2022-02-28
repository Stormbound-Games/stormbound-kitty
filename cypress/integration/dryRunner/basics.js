import s from './selectors'
import getResolvedCardData from '~/helpers/getResolvedCardData'
import cardsIndex from '../../fixtures/cards'

const showsDrawingChance = value => {
  return /\(in hand\)/.test(value) || /\([\d.]+%\)/.test(value)
}

const unselectActiveCard = ($wrapper, index) => {
  if ($wrapper.attr('data-active')) {
    cy.drSelect(index)
  }
}

const isMarkedAffordable = $card => {
  const id = $card.attr('id').split('_')[0]
  const { mana } = getResolvedCardData(cardsIndex, { id })
  const assert = mana <= 3 ? 'have.attr' : 'not.have.attr'

  cy.wrap($card).should(assert, 'data-affordable')
}

describe('Dry-runner — Basics', () => {
  const CHEAP_DECK = '5n15n25f35n35n45n55n65n625n675n661n105n16'
  const EXPENSIVE_DECK = '2n684n473n484n492n503n514n523n535n542n552n563n57'

  before(() => {
    cy.visit(`/deck/${CHEAP_DECK}/dry-run`)
  })

  afterEach(() => {
    cy.get(s.CARD).parent().each(unselectActiveCard)
  })

  it('should start the game with 4 cards', () => {
    cy.get(s.CARD).should('have.length', 4)
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
