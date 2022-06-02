import s from './selectors'

describe('Collection — Import/export', () => {
  it('should be possible to import a CSV', () => {
    cy.visit('/collection')
    cy.get(s.IMPORT_BTN).importFile('collection.import.csv')
    cy.get(s.CARD).filter('#N1').find(s.CARD_LEVEL).should('contain', 'Level 2')
  })

  it('should be possible to import an incomplete collection', () => {
    cy.visit('/collection')
    cy.get(s.IMPORT_BTN).importFile('collection.import2.csv')
    cy.get(s.CARD).filter('#N1').find(s.CARD_LEVEL).should('contain', 'Level 3')
  })

  it('should mark missing rows as missing cards', () => {
    cy.get(s.CARD).filter('#N2').should('have.attr', 'data-missing', 'true')
  })

  it('should be possible to export the collection as CSV', () => {
    cy.get(s.EXPORT_BTN).exportFile().should('contain', 'Green Prototypes,3,0')
  })
})
