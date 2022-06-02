import s from './selectors'

describe('Battle Simulator — Drag and drop', () => {
  before(() => {
    cy.visit('/simulators/battle')
  })

  it('should be possible to drag a filled cell on an empty slot', () => {
    cy.bsFill('A1', { card: 'Zhev', strength: 1 })
    cy.get(s.CELL_A1).trigger('mousedown')
    cy.get(s.CELL_B1).trigger('mouseover').trigger('mouseup')
    cy.get(s.CELL_A1).find(s.CELL_IMAGE).should('not.exist')
    cy.get(s.CELL_A1).find(s.CELL_STRENGTH).should('not.exist')
    cy.get(s.CELL_B1)
      .find(s.CELL_STRENGTH)
      .then($strength => expect($strength).to.have.text('1'))
  })

  it('should be able to swap two filled cells', () => {
    cy.bsFill('A1', { card: 'Ubass', strength: 10 })
    cy.url().then(currentUrl => {
      cy.get(s.CELL_A1).trigger('mousedown')
      cy.get(s.CELL_B1).trigger('mouseover').trigger('mouseup')
      cy.url().should('not.eq', currentUrl)
    })
    cy.get(s.CELL_A1)
      .find(s.CELL_STRENGTH)
      .then($strength => expect($strength).to.have.text('1'))
    cy.get(s.CELL_A1).should($cell =>
      expect($cell.attr('title')).to.match(/Zhev/)
    )
    cy.get(s.CELL_B1)
      .find(s.CELL_STRENGTH)
      .then($strength => expect($strength).to.have.text('10'))
    cy.get(s.CELL_B1).should($cell =>
      expect($cell.attr('title')).to.match(/Ubass/)
    )
  })
})
