import releases from '../../../src/data/releases'

describe('Routes — Releases', () => {
  releases.forEach(release => {
    it(`it should render ${release.name}`, () => {
      cy.visit('/releases/' + release.slug)
        .get('h1')
        .should('be.visible')
    })
  })

  it('should render the card changes', () => {
    cy.visit('/changelog').get('main h1').should('exist')
  })
})
