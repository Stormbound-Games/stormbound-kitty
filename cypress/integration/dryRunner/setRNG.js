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
      cy.drDrawHand(HAND)
      cy.drEndTurn(3)
      cy.drSetRNG('FRIENDLY')
      cy.drPlay(id)
      cy.drEndTurn()
      cy.get(s.MANA).should('contain', 7 + mana)
      cy.drSetRNG('UNFRIENDLY')
      cy.drEndTurn()
      cy.get(s.MANA).should('contain', 8)
    })
  })

  it('should only be possible to get Ahmi back in hand in FRIENDLY mode', () => {
    cy.visit(`/deck/${DECK_ID}/dry-run?mode=MANUAL`)
    cy.drDrawHand(HAND)
    cy.drEndTurn(3)
    cy.drSetRNG('FRIENDLY')
    cy.drPlay('S3')
    cy.drSetRNG('UNFRIENDLY')
    cy.drPlay('S3')
    cy.get('S3').should('not.exist')
  })

  it('should only be possible to get Temple of Space back in hand in FRIENDLY mode', () => {
    cy.visit(`/deck/${DECK_ID.replace('5s3', '5i29')}/dry-run?mode=MANUAL`)
    cy.drDrawHand(['W9', 'W16', 'N12', 'I29'])
    cy.drEndTurn(3)
    cy.drSetRNG('FRIENDLY')
    cy.drPlay('I29')
    cy.drSetRNG('UNFRIENDLY')
    cy.drPlay('I29')
    cy.get('I29').should('not.exist')
  })
})
