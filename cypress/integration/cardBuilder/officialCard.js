import s from './selectors'

describe('Card Builder — Official card', () => {
  before(() => cy.visit('/card'))

  it('should be possible to load an official card', () => {
    cy.get(s.CARD_SELECT)
      .find('.CardSelect__single-value')
      .should('have.text', 'Load Card')
      .get(s.CARD_SELECT)
      .find('input')
      .first()
      .click({ force: true })
      .type('Sweet', { force: true })
      .type('{enter}', { force: true })
      .get('.Header__nav + .Header__nav .Header__action')
      .first()
      .click()
      .get(s.IMAGE_SELECT)
      .find('.CardSelect__single-value')
      .should('contain', 'Sweetcap Kittens')

      .get(s.CARD_NAME)
      .should('contain', 'Sweetcap Kittens')
  })

  it('should be possible to unload an official card', () => {
    cy.get(s.CARD_SELECT)
      .find('.CardSelect__clear-indicator')
      .click({ force: true })

      .get(s.CARD_SELECT)
      .find('.CardSelect__single-value')
      .should('have.text', 'Load Card')

      .get(s.CARD_NAME)
      .should('be.empty')
  })

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
      .importFile('collection.import.csv')

      .visit('/card/N1/display')

      .get('[role="progressbar"]')
      .should('exist')
  })

  it('should controls with a loaded collection', () => {
    cy.visit('/collection')
      .get('[data-testid="import-btn"]')
      .importFile('collection.import.csv')

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

  it('should display upgradable levels with a loaded collection', () => {
    cy.visit('/collection')
      .get('[data-testid="import-btn"]')
      .importFile('collection.import.csv')

      .visit('/card/N1/display')

      .get(s.CARD)
      .eq(2)
      .should('have.class', 'Card--upgradable')

      .get(s.CARD)
      .eq(3)
      .should('not.have.class', 'Card--upgradable')

      .get(s.CARD)
      .eq(4)
      .should('not.have.class', 'Card--upgradable')
  })
})
