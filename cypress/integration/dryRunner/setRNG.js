import s from './selectors'

const DECK_ID = '5n25n35n235n45n65n625s35n125n145w95w165w33'
const HAND = ['W9', 'W16', 'W33', 'S3']

describe('Dry-runner — Set RNG', () => {
  ;[
    { name: 'Frozen Cores', id: 'W9', mana: 3 },
    { name: 'Dawnsparks', id: 'W16', mana: 4 },
  ].forEach(({ name, id, mana }) => {
    it(`should only be possible to update mana from ${name} that have not been destroyed yet`, () => {
      cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
        .drDrawHand(HAND)
        .drEndTurn(3)

        .drSetRNG('FRIENDLY')
        .drPlay(id)

        .drEndTurn()
        .get(s.MANA)
        .should('contain', 7 + mana)

        .drSetRNG('UNFRIENDLY')

        .drEndTurn()
        .get(s.MANA)
        .should('contain', 8)
    })
  })

  it('should only be possible to get Ahmi back in hand in FRIENDLY mode', () => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
      .drDrawHand(HAND)
      .drEndTurn(3)

      .drSetRNG('FRIENDLY')
      .drPlay('S3')

      .drSetRNG('UNFRIENDLY')
      .drPlay('S3')

      .get('S3')
      .should('not.exist')
  })

  it('should only be possible to get Temple of Space back in hand in FRIENDLY mode', () => {
    cy.visit(`/deck/${DECK_ID.replace('5s3', '5i29')}/dry-run?mode=MANUAL`)
      .drDrawHand(['W9', 'W16', 'N12', 'I29'])
      .drEndTurn(3)

      .drSetRNG('FRIENDLY')
      .drPlay('I29')

      .drSetRNG('UNFRIENDLY')
      .drPlay('I29')

      .get('I29')
      .should('not.exist')
  })
})
