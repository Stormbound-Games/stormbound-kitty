import s from './selectors'

describe('Battle Sim — Drag and drop', () => {
  before(() => {
    cy.visit('/sim')
  })

  it('should be possible to drag a filled cell on an empty slot', () => {
    cy.fill('A1', { card: 'Zhev', strength: 1 })
      .get(s.CELL_A1)
      .trigger('mousedown')
      .get(s.CELL_B1)
      .trigger('mouseover')
      .trigger('mouseup')
      .get(s.CELL_A1)
      .find(s.CELL_IMAGE)
      .should('not.exist')
      .get(s.CELL_A1)
      .find(s.CELL_STRENGTH)
      .should('not.exist')
      .get(s.CELL_B1)
      .find(s.CELL_IMAGE)
      .get(s.CELL_B1)
      .find(s.CELL_STRENGTH)
      .then($strength => expect($strength).to.have.text('1'))
  })

  it('should be able to swap to filled cells', () => {
    cy.fill('A1', { card: 'Ubass', strength: 10 })
      .get(s.CELL_A1)
      .trigger('mousedown')
      .get(s.CELL_B1)
      .trigger('mouseover')
      .trigger('mouseup')

      .get(s.CELL_A1)
      .find(s.CELL_STRENGTH)
      .then($strength => expect($strength).to.have.text('1'))
      .get(s.CELL_A1)
      .should($cell => expect($cell.attr('title')).to.match(/Zhev/))

      .get(s.CELL_B1)
      .find(s.CELL_STRENGTH)
      .then($strength => expect($strength).to.have.text('10'))
      .get(s.CELL_B1)
      .should($cell => expect($cell.attr('title')).to.match(/Ubass/))
  })
})
