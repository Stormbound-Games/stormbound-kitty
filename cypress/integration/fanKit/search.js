import s from './selectors'

describe('Fan-kit — Card Search', () => {
  before(() => cy.visit('/fan-kit/cards'))

  it('should be possible to search for cards', function () {
    cy.get(s.ITEMS).its('length').as('count')
    cy.get(s.IMAGE_INPUT).type('Gift{enter}', { force: true })
    cy.get('@count').then(count => {
      cy.get(s.ITEMS).its('length').should('not.eq', count)
    })
  })
})
