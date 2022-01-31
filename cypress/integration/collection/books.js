import s from './selectors'

describe('Collection — Books', () => {
  before(() => {
    cy.visit('/calculators/books')
  })

  it('should display fusion stones in Mythic Tome as a default value', () => {
    cy.get(s.BOOK_SELECT)
      .should('have.value', 'MYTHIC')
      .get(s.TARGET_SELECT)
      .should('have.value', 'FUSION_STONES')
      .get(s.ODDS_RESULT)
      .should('not.be.empty')
  })

  it('should be possible to change book', () => {
    cy.get(s.BOOK_NAME)
      .invoke('text')
      .then(result => {
        cy.get(s.BOOK_SELECT)
          .select('NOBLE')

          .get(s.BOOK_NAME)
          .invoke('text')
          .should('not.equal', result)
      })
  })

  it('should be possible to change target', () => {
    cy.get(s.ODDS_RESULT)
      .invoke('text')
      .then(result => {
        cy.get(s.TARGET_SELECT)
          .select('SPECIFIC_LEGENDARY')

          .get(s.ODDS_RESULT)
          .invoke('text')
          .should('not.equal', result)
      })
  })

  it('should adjust the average stones per book', () => {
    cy.get(s.AVERAGE_STONES)
      .invoke('text')
      .then(result => {
        cy.get(s.BOOK_SELECT)
          .select('HEROIC')

          .get(s.AVERAGE_STONES)
          .invoke('text')
          .should('not.equal', result)
      })
  })
})
