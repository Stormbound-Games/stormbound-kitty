import s from './selectors'

describe('Collection — Import/export', () => {
  beforeEach(() => cy.visit('/collection'))

  it('should be possible to import/export a CSV', () => {
    cy.get(s.IMPORT_BTN).importFile('collection.import.csv')
    cy.get(s.CARD).filter('#N1').find(s.CARD_LEVEL).should('contain', 'Level 2')
    cy.get(s.EXPORT_BTN).exportFile().should('contain', 'Green Prototypes,2,5')
  })

  it('should be possible to import an incomplete collection', () => {
    cy.get(s.IMPORT_BTN).importFile('collection.import2.csv')
    cy.get(s.CARD).filter('#N1').find(s.CARD_LEVEL).should('contain', 'Level 3')
    cy.get(s.CARD).filter('#N2').should('have.attr', 'data-missing', 'true')
  })
})
