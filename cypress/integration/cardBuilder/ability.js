import s from './selectors'

describe('Card Builder — Ability', () => {
  const assertCardAbility = (index, ability) =>
    cy
      .get(s.CARD_PREVIEW)
      .eq(index)
      .find(s.CARD_ABILITY)
      .should('contain', ability)

  before(() => {
    cy.visit('/card')
  })

  it('should be empty by default', () => {
    cy.get(s.ABILITY_INPUT).should('be.empty')
  })

  it('should be possible to define the card ability', () => {
    cy.get(s.ABILITY_INPUT).type('Sparkles').should('have.value', 'Sparkles')
  })

  it('should be reflected in all preview', () => {
    for (let i = 0; i < 5; i++) assertCardAbility(i, 'Sparkles')
  })

  it('should be preserved upon reload', () => {
    cy.reload()
    cy.get(s.ABILITY_INPUT).should('have.value', 'Sparkles')
    for (let i = 0; i < 5; i++) assertCardAbility(i, 'Sparkles')
  })

  it('should be possible to define it per level', () => {
    cy.get(s.ABILITY_INPUT).clear().type('Sparkles 2/3/4/5/6 times')
    assertCardAbility(0, 'Sparkles 2 times')
    assertCardAbility(1, 'Sparkles 3 times')
    assertCardAbility(2, 'Sparkles 4 times')
    assertCardAbility(3, 'Sparkles 5 times')
    assertCardAbility(4, 'Sparkles 6 times')
  })

  it('should support Markdown bold stars', () => {
    cy.get(s.ABILITY_INPUT)
      .clear()
      .type('Sparkles *forever*')
      .get(s.CARD_PREVIEW)
      .eq(0)
      .find(s.CARD_ABILITY)
      .find('strong')
      .should('exist')
  })
})
