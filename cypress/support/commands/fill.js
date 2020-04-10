import s from '../../integration/battleSim/selectors'

export default (
  subject,
  cell,
  { card, level, strength, player, poisoned, frozen }
) => {
  Cypress.log({
    name: 'Fill ' + cell,
    message: [card, level, player].filter(Boolean).join(' '),
  })

  return cy
    .get(`[data-testid="cell-${cell}"]`)
    .then($cell => {
      if (Boolean($cell.attr('aria-pressed')) !== true) {
        return $cell.click()
      }
    })
    .get(s.CELL_FORM_CARD_SELECT)
    .click({ force: true })
    .type(card, { force: true })
    .type('{enter}', { force: true })

    .then(() => {
      if (level) {
        return cy.get(s.CELL_FORM_LEVEL).select(String(level))
      }
    })

    .then(() => {
      if (player) {
        return cy
          .get(
            player === 'RED' ? s.CELL_FORM_RED_RADIO : s.CELL_FORM_BLUE_RADIO
          )
          .click({ force: true })
      }
    })

    .then(() => {
      if (strength) {
        cy.get(s.CELL_FORM_STRENGTH).clear().type(String(strength))
      }
    })

    .then(() => {
      if (poisoned) {
        cy.get(s.CELL_FORM_POISON_CHECKBOX).click({ force: true })
      }
    })

    .then(() => {
      if (frozen) {
        cy.get(s.CELL_FORM_FROZEN_CHECKBOX).click({ force: true })
      }
    })

    .get(s.CELL_FORM_BTN)
    .click()
}
