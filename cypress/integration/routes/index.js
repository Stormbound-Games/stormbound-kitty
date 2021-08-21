import getSearchIndex from '~/helpers/getSearchIndex'

describe('Routes', () => {
  const links = getSearchIndex(false)

  links.forEach(link => {
    it(`${link.path} (${link.label})`, () =>
      cy.visit(link.path).get('h1').should('exist'))
  })
})
