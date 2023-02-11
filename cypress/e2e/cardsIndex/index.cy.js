import s from './selectors'
import formatCardStats from '#helpers/formatCardStats'
import serialization from '#helpers/serialization'

const N1 = {
  ability:
    'On death, *give 1/2/3/4/5 strength* to a random *surrounding* enemy unit and *vitalize* it',
  faction: 'neutral',
  id: 'N1',
  image:
    'https://cdn.sanity.io/images/5hlpazgd/production/74d169c287905be1edd33c81c09e87a62e485648-512x512.png',
  mana: 1,
  movement: 1,
  name: 'Green Prototypes',
  rarity: 'rare',
  sid: 'u007',
  strength: '1/2/3/4/5',
  type: 'unit',
  unitTypes: ['construct'],
}

const RESOLVED_N1 = serialization.card.deserialize(
  { N1 },
  serialization.card.serialize(N1)
)

describe('Cards Index — Index', () => {
  beforeEach(() => cy.visit('/cards/N1'))

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
      formatCardStats(RESOLVED_N1)
    )
    cy.get('meta[property="og:image"]').should('have.attr', 'content', N1.image)
    cy.get('[rel="canonical"]')
      .invoke('attr', 'href')
      .should('not.contain', '[')
      .and('not.contain', ']')
  })
})
