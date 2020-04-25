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

describe('Deck Builder — Dry-run', () => {
  const CHEAP_DECK =
    'NU4xLDVOMiw1RjMsNU4zLDVONCw0TjUsNE42LDJONjIsMk42NywyTjY2LDNONyw1TjE2'
  const EXPENSIVE_DECK =
    'Mk42OCw0TjQ3LDNONDgsNE40OSwyTjUwLDNONTEsNE41MiwzTjUzLDVONTQsMk41NSwyTjU2LDNONTc='

  before(() => {
    cy.visit(`/deck/${CHEAP_DECK}/dry-run`)
  })

  afterEach(() => {
    cy.get(s.DR_CARD).parent().each(unselectActiveCard)
  })

  it('should have a correct default state', () => {
    cy.get(s.DR_MANA)
      .should('contain', 3)
      .get(s.DR_CARD)
      .should('have.length', 4)
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
    cy.get(s.DR_CARD).each(isMarkedAffordable)
  })

  it('should be possible to cycle a single card', () => {
    cy.drCycle(0)

      .get('@card')
      .should('not.exist')

      .get(s.DR_CARD)
      .should('have.length', 4)

      .drSelect(0)

      .get(s.DR_CYCLE_BTN)
      .and('be.disabled')
  })

  it('should be possible to play an affordable card', () => {
    cy.drPlay(0)

      .get('@card')
      .should('not.exist')

      .get(s.DR_CARD)
      .should('have.length', 3)
  })

  it('should be possible to end turn', () => {
    cy.drEndTurn()

      .get(s.DR_MANA)
      .should('contain', 4)

      .get(s.DR_CARD)
      .should('have.length', 4)
  })

  it('should not be possible to play a card costing too much mana', () => {
    cy.visit(`/deck/${EXPENSIVE_DECK}/dry-run`)

      .drSelect(0)

      .get(s.DR_PLAY_BTN)
      .and('be.disabled')
  })
  ;[
    { id: 'W2', name: 'Frosthexers' },
    { id: 'W11', name: 'Midwinter Chaos' },
    { id: 'W6', name: 'Moment’s Peace' },
  ].forEach(({ id, name }) => {
    it(
      'should not be possible to play Icicle Burst without playing ' + name,
      () => {
        const FREEZE_DECK_ID =
          'NU4xLDRXMSw1TjIsNVcyLDVOMyw1TjQsNE41LDRONiwyTjYyLDJONjMsM1cxMSw0VzY='
        const HAND = ['N1', 'N2', 'W1', id]

        cy.visit(`/deck/${FREEZE_DECK_ID}/dry-run?mode=MANUAL`)

          .drDrawHand(HAND)

          .drEndTurn()
          .drEndTurn()
          .drEndTurn()

          .drSelect('W1')
          .get(s.DR_PLAY_BTN)
          .should('be.disabled')

          .drPlay(id)
          .drPlay('W1')
      }
    )
  })

  it('should be possible to get mana from Spellbinder Zhevana', () => {
    const ZHEVANA_DECK_ID =
      'NU4xLDVXMSw1TjIsNVcyLDVOMyw1TjIzLDVONCw1TjUsNVc0LDVXMTEsNVc4LDVXNg'
    const HAND = ['W1', 'W2', 'W6', 'W8']

    cy.visit(`/deck/${ZHEVANA_DECK_ID}/dry-run?mode=MANUAL`)

      .drDrawHand(HAND)

      .drEndTurn()
      .drEndTurn()
      .drEndTurn()

      .drPlay('W2')
      .drPlay('W8')

      .get(s.DR_MANA)
      .should('contain', 4)
  })

  it('should not be possible to play Icicle Burst after clearing the board of frozen enemies', () => {
    const ZHEVANA_DECK_ID =
      'NU4xLDVXMSw1TjIsNVcyLDVOMyw1TjIzLDVONCw1TjUsNVc0LDVXMTEsNVc4LDVXNg'
    const HAND = ['W1', 'W4', 'W6', 'W8']

    cy.visit(`/deck/${ZHEVANA_DECK_ID}/dry-run?mode=MANUAL`)

      .drDrawHand(HAND)

      .drEndTurn()
      .drEndTurn()
      .drEndTurn()
      .drEndTurn()
      .drEndTurn()
      .drEndTurn()

      .drPlay('W6')
      .drPlay('W8')
      .drPlay('W4')

      .drSelect('W1')
      .get(s.DR_PLAY_BTN)
      .should('be.disabled')
  })

  it('should not be possible to play Unhealthy Hysteria before turn 2', () => {
    const UNHEALTHY_HYSTERIA_DECK =
      'NU4xLDVOMiw1TjMsNU4yMyw1TjQsNU41LDVONiw1TjYyLDVONjMsNU42Nyw1TjY2LDVONw'
    const HAND = ['N1', 'N2', 'N3', 'N63']

    cy.visit(`/deck/${UNHEALTHY_HYSTERIA_DECK}/dry-run?mode=MANUAL`)

      .drDrawHand(HAND)

      .drSelect('N63')
      .get(s.DR_PLAY_BTN)
      .should('be.disabled')

      .drEndTurn()

      .drPlay('N63')
  })
})
