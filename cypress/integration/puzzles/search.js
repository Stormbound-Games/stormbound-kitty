import s from './selectors'

describe('Puzzles — Search', () => {
  beforeEach(() => {
    cy.visit('/puzzles')
  })

  it('should be able to filter by type', () => {
    cy.get(s.CATEGORY_SELECT)
      .select('SURVIVE')
      .get(s.PUZZLE)
      .should($puzzle =>
        expect($puzzle.attr('data-testid')).to.include('SURVIVE')
      )
  })

  it('should be able to filter by name', () => {
    cy.get(s.NAME_INPUT).type('brok').get(s.PUZZLE).should('have.length', '1')
  })

  it('should be able to filter by restrictions', () => {
    cy.get(s.RESTRICTION_CHECKBOXES)
      .filter('#RNG_FRIENDLY')
      .check()

      .get(s.PUZZLE)
      .then($puzzle => {
        expect($puzzle.attr('data-testid')).to.include('RNG_FRIENDLY')
      })
  })

  it('should be possible to navigate to the sim', () => {
    cy.get(s.PUZZLE)
      .first()
      .find('h2 a')
      .first()
      .click()
      .url()
      .should('match', /\/puzzles\/\w+/)
  })
})
