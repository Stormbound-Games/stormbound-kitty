import links from '../../fixtures/registry'

describe('Routes', () => {
  links.forEach(link => {
    it(`${link.label} (${link.path})`, () => {
      cy.visit(link.path).get('h1', { log: false }).should('exist')
    })
  })
})
