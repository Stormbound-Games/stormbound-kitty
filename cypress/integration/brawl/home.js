import s from './selectors'
import { BRAWLS } from '../../../src/constants/brawl'

describe('Brawl — Home', () => {
  it('should display a teaser per Brawl', () => {
    cy.visit('/brawl').get(s.TEASER).should('have.length', BRAWLS.length)
  })
})
