import s from './selectors'

describe('Deck Builder — Levels', () => {
  before(() => {
    cy.visit('/deck')
  })

  it('should display cards level 1', () => {
    cy.get(s.CARD).find(s.CARD_LEVEL).should('contain', 1)
  })

  it('should be possible to change the level', () => {
    cy.get(s.LEVEL_SELECT)
      .select('5')
      .get(s.CARD)
      .find(s.CARD_LEVEL)
      .should('contain', 5)
  })

  it('should be possible to change the level with the keyboard', () => {
    cy.get('body')
      .trigger('keydown', { keyCode: 51, which: 51, force: true })
      .get(s.CARD)
      .find(s.CARD_LEVEL)
      .should('contain', 3)
  })

  it('should adjust levels/presence in card gallery to collection', () => {
    cy.get(s.IMPORT_BTN).importFile('collection.import.csv')
    cy.get(s.LEVEL_SELECT).should('have.value', '0')
    cy.get(s.CARD).filter('#N89').should('have.attr', 'data-missing', 'true')
    cy.get('body').trigger('keydown', { keyCode: 51, which: 51, force: true })
    cy.get(s.CARD).find(s.CARD_LEVEL).should('contain', 3)
    cy.get(s.CARD).filter('#N89').should('not.have.attr', 'data-missing')
  })
})
