import s from './selectors'

describe('Official card — Changelog', () => {
  before(() => cy.visit('/cards/N1'))

  it('should be possible to load previous version', () => {
    cy.get(s.CARD_ABILITY)
      .first()
      .invoke('text')
      .then(ability => {
        cy.get(s.VERSION_BTN)
          .last()
          .click()
          .url()
          // Do not test for the timestamp as the conversion is done on the
          // client, which can result in some subtle timezone differences.
          .should('not.match', /N1$/)
        cy.get(s.CARD_ABILITY)
          .first()
          .invoke('text')
          .should('not.equal', ability)
      })
  })

  it('should mention the version in page meta', () => {
    cy.get('title')
      .should('contain', 'prior')
      .get('[data-testid="page-meta"]')
      .should('contain', 'Prior')
  })

  it('should be possible to unload previous version', () => {
    cy.get(s.CARD_ABILITY)
      .first()
      .invoke('text')
      .then(ability => {
        cy.get(s.VERSION_BTN).last().click().url().should('match', /N1$/)
        cy.get(s.CARD_ABILITY)
          .first()
          .invoke('text')
          .should('not.equal', ability)
      })
  })
})
