import s from './selectors'
import cardsIndex from '../../fixtures/cards.json'
import { getCardData } from '../../utils'
import formatCardStats from '~/helpers/formatCardStats'
import serialization from '~/helpers/serialization'

const resolveCard = id =>
  serialization.card.deserialize(
    cardsIndex,
    serialization.card.serialize(cardsIndex[id])
  )

describe('Official card — Index', () => {
  before(() => cy.visit('/cards/N1'))

  it('should hide the editing interface', () => {
    cy.get('form:not([name="search"])').should('not.exist')
    cy.get(s.CARD_NAME).should('contain', 'Green Prototypes')
    cy.get(s.CARD_LEVEL).each(($level, index) =>
      cy.wrap($level).should('contain', 'Level ' + (index + 1))
    )
  })

  it('should have correct meta', () => {
    cy.get('title').should('contain', 'Green Prototypes')
    cy.get('meta[name="description"]').should(
      'have.attr',
      'content',
      formatCardStats(resolveCard('N1'))
    )
    cy.get('meta[property="og:image"]').should(
      'have.attr',
      'content',
      getCardData('N1').image
    )
    cy.get('[rel="canonical"]')
      .invoke('attr', 'href')
      .should('not.contain', '[')
      .and('not.contain', ']')
  })
})
