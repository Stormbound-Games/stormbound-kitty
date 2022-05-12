import s from './selectors'

const assertCardType = (index, type) =>
  cy
    .get(s.CARD_PREVIEW)
    .eq(index)
    .find('[data-testid="card"]')
    .should('have.attr', 'data-type', type)

describe('Card Builder — Type', () => {
  before(() => {
    cy.visit('/card')
  })

  it('should be unit by default', () => {
    cy.get(s.TYPE_SELECT).should('have.value', 'unit')
  })

  it('should be possible to update the card faction', () => {
    cy.get(s.TYPE_SELECT)
      .should('be.visible')
      .select('spell')
      .should('have.value', 'spell')
  })

  it('should be reflected in all preview', () => {
    assertCardType(0, 'spell')
  })

  it('should be preserved upon reload', () => {
    cy.url()
      .should('not.match', /\/card$/)
      .reload()
    cy.get(s.TYPE_SELECT).should('have.value', 'spell')
    assertCardType(0, 'spell')
  })
})
