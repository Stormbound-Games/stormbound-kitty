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

  it('should prevent changing level with a card collection', () => {
    cy.get(s.IMPORT_BTN)
      .importCollection('collection.import.csv')
      .get(s.LEVEL_SELECT)
      .should('not.exist')
      .get('body')
      .trigger('keydown', { keyCode: 51, which: 51, force: true })
      .get(s.CARD)
      .find(s.CARD_LEVEL)
      .should('not.contain', 3)
  })
})
