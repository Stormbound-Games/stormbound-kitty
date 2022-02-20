import getSearchIndex from '~/helpers/getSearchIndex'

describe('Routes', () => {
  before(() => {
    cy.wrap(null)
      .then(() => getSearchIndex(false))
      .as('links')
  })

  it('should test routes', () => {
    cy.get('@links').each(link =>
      cy.visit(link.path).get('h1', { log: false }).should('exist')
    )
  })
})
