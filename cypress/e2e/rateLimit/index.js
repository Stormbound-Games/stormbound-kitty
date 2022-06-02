import { LIMIT_PER_WINDOW } from '~/helpers/applyRateLimit'

describe('Brute-force protection', () => {
  it('should return the rate-limiting upper limit as a header', () => {
    cy.request({ url: '/api/search', method: 'GET', failOnStatusCode: false })
      .its('headers')
      .its('x-ratelimit-limit')
      .should('eq', String(LIMIT_PER_WINDOW))
  })

  it('should count down requests up to the limit', () => {
    cy.request({ url: '/api/search', method: 'GET', failOnStatusCode: false })
      .its('headers')
      .its('x-ratelimit-remaining')
      .should(count => expect(Number(count)).to.be.lessThan(LIMIT_PER_WINDOW))
  })
})
