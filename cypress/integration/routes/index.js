import getSitemap from '../../../src/helpers/getSitemap'

const links = getSitemap('LIGHT')

describe('Routes', () => {
  links.forEach(link => {
    it(link, () => cy.visit(link).get('h1').should('exist'))
  })
})
