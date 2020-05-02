import s from './selectors'

describe('Card Builder — Official card', () => {
  it('should hide the editing interface', () => {
    cy.visit('/card/N1/display')
      .get('form')
      .should('not.exist')

      .get(s.CARD_NAME)
      .should('contain', 'Green Prototypes')

      .get(s.CARD_LEVEL)
      .each(($level, index) =>
        cy.wrap($level).should('contain', 'Level ' + (index + 1))
      )
  })

  it('should display progress with a loaded collection', () => {
    cy.visit('/collection')
      .get('[data-testid="import-btn"]')
      .importCollection('collection.import.csv')
      .visit('/card/N1/display')
      .get('[role="progressbar"]')
      .should('exist')
  })

  it('should controls with a loaded collection', () => {
    cy.visit('/collection')
      .get('[data-testid="import-btn"]')
      .importCollection('collection.import.csv')
      .visit('/card/N1/display')
      .get(s.PREV_BTN)
      .should('not.exist')
      .get(s.NEXT_BTN)
      .click()
      .url()
      .should('match', /\/card\/N2\/display/)
      .get(s.PREV_BTN)
      .click()
      .url()
      .should('match', /\/card\/N1\/display/)
  })

  it('should display affordable levels with a loaded collection', () => {
    cy.visit('/collection')
      .get('[data-testid="import-btn"]')
      .importCollection('collection.import.csv')
      .visit('/card/N1/display')
      .get(s.CARD)
      .eq(2)
      .should('have.class', 'Card--affordable')
      .get(s.CARD)
      .eq(3)
      .should('not.have.class', 'Card--affordable')
      .get(s.CARD)
      .eq(4)
      .should('not.have.class', 'Card--affordable')
  })
})
