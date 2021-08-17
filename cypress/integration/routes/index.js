import getSitemap from '~/helpers/getSitemap'

const links = getSitemap('LIGHT')

describe('Routes', () => {
  links.forEach(link => {
    it(link, () => cy.visit(link).get('h1').should('exist'))
  })
})
