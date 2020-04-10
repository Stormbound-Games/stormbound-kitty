import s from './selectors'

describe('Battle Sim — Players', () => {
  before(() => {
    cy.visit('/sim')
  })

  it('should be possible to update RED’s health', () => {
    cy.get(s.RED_HEALTH_INPUT)
      .clear()
      .type('20')
      .get(s.RED_HEALTH)
      .then($health => expect($health).to.have.text('20'))
  })

  it('should be possible to update BLUE’s health', () => {
    cy.get(s.BLUE_HEALTH_INPUT)
      .clear()
      .type('5')
      .get(s.BLUE_HEALTH)
      .then($health => expect($health).to.have.text('5'))
  })

  it('should be possible to update RED’s faction', () => {
    cy.get(s.RED_FACTION_SELECT)
      .select('swarm')
      .get(s.RED_FACTION)
      .then($faction => expect($faction).to.have.text('swarm'))
  })

  it('should be possible to update BLUE’s faction', () => {
    cy.get(s.BLUE_FACTION_SELECT)
      .select('ironclad')
      .get(s.BLUE_FACTION)
      .then($faction => expect($faction).to.have.text('ironclad'))
  })

  it('should be preserved upon reload', () => {
    cy.reload()
      .get(s.RED_HEALTH)
      .then($health => expect($health).to.have.text('20'))
      .get(s.BLUE_HEALTH)
      .then($health => expect($health).to.have.text('5'))
      .get(s.RED_FACTION)
      .then($faction => expect($faction).to.have.text('swarm'))
      .get(s.BLUE_FACTION)
      .then($faction => expect($faction).to.have.text('ironclad'))
  })
})
