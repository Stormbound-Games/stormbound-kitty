import s from './selectors'

const DECK_ID =
  'NU4xLDRXMSw1TjIsNVcyLDVOMyw1TjQsNE41LDRONiwyTjYyLDJONjMsM1cxMSw0VzY='
const ZHEVANA_DECK_ID =
  'NU4xLDVXMSw1TjIsNVcyLDVOMyw1TjIzLDVONCw1TjUsNVc0LDVXMTEsNVc4LDVXNg'

describe('Dry-runner — Icicle Burst', () => {
  ;[
    { id: 'W2', name: 'Frosthexers' },
    { id: 'W11', name: 'Midwinter Chaos' },
    { id: 'W6', name: 'Moment’s Peace' },
  ].forEach(({ id, name }) => {
    it(
      'should not be possible to play Icicle Burst without playing ' + name,
      () => {
        cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
          .drDrawHand(['N1', 'N2', 'W1', id])

          .drEndTurn(3)

          .drSelect('W1')
          .get(s.PLAY_BTN)
          .should('be.disabled')

          .drPlay(id)
          .drPlay('W1')
      }
    )
  })

  it('should not be possible to play Icicle Burst after clearing the board of frozen enemies', () => {
    cy.visit(`/deck/${ZHEVANA_DECK_ID}/dry-run?mode=MANUAL`)
      .drDrawHand(['W1', 'W4', 'W6', 'W8'])

      .drEndTurn(6)

      .drPlay('W6')
      .drPlay('W8')
      .drPlay('W4')

      .drSelect('W1')
      .get(s.PLAY_BTN)
      .should('be.disabled')
  })
})
