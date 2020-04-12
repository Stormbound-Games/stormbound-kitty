import { WEEKLY_CARD_CONTEST } from '../../../src/constants/misc'

describe('Routes — Card Builder', () => {
  it('it should render', () => {
    cy.visit('/card').get('main h1').should('exist')
  })

  it('it should render the contest page', () => {
    cy.visit('/card/contest').get('main h1').should('exist')
  })

  it('it should render the editor mode', () => {
    cy.visit('/card/' + WEEKLY_CARD_CONTEST[0].winner.id)
      .get('main h1')
      .should('exist')
  })

  it('it should render the display mode', () => {
    cy.visit('/card/' + WEEKLY_CARD_CONTEST[0].winner.id + '/display')
      .get('main h1')
      .should('exist')
  })
})
