import s from './selectors'

describe('List Builder', () => {
  before(() => cy.visit('/list'))

  it('should be possible to fill the first tier', () => {
    cy.get(s.TIER).should('have.length', 1)
    cy.get(s.TIER).first().as('firstTier')
    cy.get('@firstTier').find(s.TIER_NAME_INPUT).type('S')
    cy.get('@firstTier')
      .find(s.TIER_CARD_INPUT)
      .type('Spark{enter}', { force: true })
      .type('Green{enter}', { force: true })
    cy.url().should('not.match', /\/list$/)
    cy.get('@firstTier').find(s.TIER_CARD).should('have.length', 2)
  })

  it('should be possible to add more tiers', () => {
    cy.get(s.TIER_ADD).click()
    cy.get(s.TIER_ADD).click()
    cy.get(s.TIER_ADD).click()
    cy.get(s.TIER_CARD_INPUT).last().type('Gift{enter}', { force: true })
    cy.get(s.TIER_NAME_INPUT).should('have.length', 4)
  })

  it('should preserve non-empty tiers upon reload', () => {
    cy.reload()
    cy.url().should('not.match', /\/list$/)
    cy.get(s.TIER).should('have.length', 2)
    cy.get(s.TIER_CARD).should('have.length', 3)
  })

  it('should be possible to remove a card from a tier', () => {
    cy.get(s.TIER).first().find(s.TIER_CARD).as('cards')
    cy.get('@cards').should('have.length', 2)
    cy.get('@cards').first().find(s.TIER_CARD_REMOVE).click()
    cy.get('@cards').should('have.length', 1)
  })

  it('should be possible to reorder tiers', () => {
    cy.get(s.TIER).first().find(s.TIER_NAME_INPUT).invoke('val').as('name')
    cy.get(s.TIER).first().find(s.TIER_DOWN).click()
    cy.get(s.TIER)
      .last()
      .find(s.TIER_NAME_INPUT)
      .invoke('val')
      .then(value => cy.get('@name').should('eq', value))
  })
})
