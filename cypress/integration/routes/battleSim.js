import PUZZLES from '../../../src/data/puzzles'

describe('Routes — Battle Sim', () => {
  it('should render', () => {
    cy.visit('/sim').get('main h1').should('exist')
  })

  it('should render the puzzles page', () => {
    cy.visit('/sim/puzzles').get('main h1').should('exist')
  })

  PUZZLES.forEach(puzzle => {
    it('should render puzzle ' + puzzle.name, () => {
      cy.visit('/sim/' + puzzle.board + '/display')
        .get('main h1')
        .should('exist')
    })
  })
})
