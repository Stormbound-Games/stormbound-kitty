import s from './selectors'

describe('Puzzles — Search', () => {
  beforeEach(() => {
    cy.visit('/sim/puzzles')
  })

  it('should be able to filter by difficulty', () => {
    cy.get(s.DIFFICULTY_SELECT)
      .select('3')
      .get(s.PUZZLE_DIFFICULTY)
      .should('contain', '3/3')
  })

  it('should be able to filter by type', () => {
    cy.get(s.TYPE_SELECT)
      .select('SURVIVE')
      .get(s.PUZZLE_TYPE)
      .should('contain', 'survive')
  })

  it('should be able to filter by name', () => {
    cy.get(s.NAME_INPUT)
      .type('brok')
      .get(s.PUZZLE_TYPE)
      .should('have.length', '1')
  })

  it('should be able to filter by restrictions', () => {
    cy.get(s.RESTRICTION_CHECKBOXES)
      .should('not.be.visible')

      .get(s.RESTRICTION_TOGGLE)
      .click()

      .get(s.RESTRICTION_CHECKBOXES)
      .filter('#RNG_FRIENDLY')
      .check()

      .get(s.PUZZLE_RESTRICTIONS)
      .then($restrictions => {
        expect($restrictions.text()).to.contain('RNG-friendly')
      })
  })

  it('should be possible to navigate to the sim', () => {
    cy.get(s.PUZZLE_LINK)
      .first()
      .click()
      .url()
      .should('match', /\/sim\/[a-zA-Z=+]+/)
      .get(s.PUZZLE_LINK)
      .should('be.visible')
  })
})
