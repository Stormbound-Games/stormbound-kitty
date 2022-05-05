import s from './selectors'

describe('Battle Simulator — Players', () => {
  before(() => {
    cy.visit('/simulators/battle')
  })

  it('should be possible to update players health', () => {
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
  })

  it('should be possible to update players faction', () => {
    cy.get(s.RED_FACTION_SELECT)
      .select('swarm')
      .get(s.RED_FACTION)
      .then($faction => expect($faction).to.have.text('swarm'))

      .get(s.BLUE_FACTION_SELECT)
      .select('ironclad')
      .get(s.BLUE_FACTION)
      .then($faction => expect($faction).to.have.text('ironclad'))
  })

  it('should be preserved upon reload', () => {
    cy.url()
      .should('not.match', /battle$/)
      .reload()
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
