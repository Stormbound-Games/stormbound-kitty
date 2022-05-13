import s from './selectors'

describe('Battle Simulator — Players', () => {
  before(() => {
    cy.visit('/simulators/battle')
  })

  it('should be possible to update players health', () => {
    cy.url().then(currentUrl => {
      cy.get(s.RED_HEALTH_INPUT)
        .clear()
        .type('9')
        .get(s.RED_HEALTH)
        .should('have.text', '9')

        .get(s.BLUE_HEALTH_INPUT)
        .clear()
        .type('8')
        .get(s.BLUE_HEALTH)
        .should('have.text', '8')

        .url()
        .should('not.eq', currentUrl)
    })
  })

  it('should be possible to update players faction', () => {
    cy.url().then(currentUrl => {
      cy.get(s.RED_FACTION_SELECT)
        .select('swarm')
        .get(s.RED_FACTION)
        .then($faction => expect($faction).to.have.text('swarm'))

        .get(s.BLUE_FACTION_SELECT)
        .select('ironclad')
        .get(s.BLUE_FACTION)
        .then($faction => expect($faction).to.have.text('ironclad'))

        .url()
        .should('not.eq', currentUrl)
    })
  })

  it('should be preserved upon reload', () => {
    cy.reload()
      .get(s.RED_HEALTH)
      .should('have.text', '9')
      .get(s.BLUE_HEALTH)
      .should('have.text', '8')
      .get(s.RED_FACTION)
      .should('have.text', 'swarm')
      .get(s.BLUE_FACTION)
      .should('have.text', 'ironclad')
  })
})
