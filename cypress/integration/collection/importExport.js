import s from './selectors'

describe('Collection — Import/export', () => {
  before(() => {
    cy.visit('/collection')
  })

  it('should be possible to import a CSV', () => {
    cy.get(s.IMPORT_BTN)
      .importCollection('collection.import.csv')
      .get(s.CARD)
      .filter('#N1')
      .find(s.CARD_LEVEL)
      .should('contain', 'Level 2')
  })

  it('should be possible to import an incomplete collection', () => {
    cy.get(s.IMPORT_BTN)
      .importCollection('collection.import2.csv')
      .get(s.CARD)
      .filter('#N1')
      .find(s.CARD_LEVEL)
      .should('contain', 'Level 3')
  })

  it('should mark missing rows as missing cards', () => {
    cy.get(s.CARD).filter('#N2').should('have.class', 'Card--missing')
  })

  it('should be possible to export the collection as CSV', () => {
    cy.get(s.EXPORT_BTN)
      .exportCollection()
      .should('contain', 'Green Prototypes,3,0')
  })
})
