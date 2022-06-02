import s from './selectors'

const assert = (property, value) =>
  cy
    .get(s.CARD_PREVIEW)
    .eq(0)
    .find('[data-testid="card"]')
    .should('have.attr', 'data-' + property, value)

describe('Card Builder — Randomize', () => {
  before(() => {
    cy.visit('/card')
  })

  it('should allow picking a card type', () => {
    // Open the dialog.
    cy.get('[data-testid="randomize-card-cta"]').click()

    // Fill in the filter.
    cy.get('#randomize-card-dialog')
      .should('be.visible')
      .find('[data-testid="randomize-card-type"]')
      .select('spell')

    // Submit the form.
    cy.get('[data-testid="randomize-card-dialog-cta"]').click()

    // Ensure the filter was applied correctly.
    assert('type', 'spell')

    // Ensure the dialog gets closed upon generating a card.
    cy.get('#randomize-card-dialog').should('not.be.visible')
  })

  it('should allow picking a card faction', () => {
    // Submit the form.
    cy.get('[data-testid="randomize-card-cta"]').click()

    // Fill in the filter.
    cy.get('#randomize-card-dialog')
      .should('be.visible')
      .find('[data-testid="randomize-card-faction"]')
      .select('shadowfen')

    // Submit the form.
    cy.get('[data-testid="randomize-card-dialog-cta"]').click()

    // Ensure the filter was applied correctly.
    assert('faction', 'shadowfen')
  })

  it('should allow reseting all info', () => {
    cy.get(s.RESET_BTN).click()
    cy.get(s.RESET_CONFIRM_BTN).click()
    cy.get(s.NAME_INPUT).should('be.empty')
    cy.get(s.MOVEMENT_INPUT).should('be.empty')
    cy.get(s.STRENGTH_INPUT).should('be.empty')
    cy.get(s.MANA_INPUT).should('be.empty')
    cy.get(s.RARITY_SELECT).should('have.value', 'common')
    cy.get(s.UNIT_TYPES_SELECT)
      .find('.UnitTypeSelect__multi-value')
      .should('not.exist')
    cy.get(s.FACTION_SELECT).should('have.value', 'neutral')
    cy.get(s.IMAGE_INPUT).should('be.empty')
  })
})
