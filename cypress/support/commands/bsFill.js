import s from '../../integration/battleSim/selectors'

export default (
  subject,
  cell,
  { card, level, strength, player, poisoned, frozen }
) => {
  Cypress.log({
    name: 'FILL',
    message: `Fill ${cell} with ${card}`,
    consoleProps: () => ({
      subject,
      cell,
      card,
      level,
      strength,
      player,
      poisoned,
      frozen,
    }),
  })

  return cy
    .get(`[data-testid="cell-${cell}"]`, { log: false })
    .then($cell => {
      if (Boolean($cell.attr('aria-pressed')) !== true) {
        return cy.wrap($cell, { log: false }).click({ log: false })
      }
    })
    .get(s.CELL_FORM_CARD_SELECT, { log: false })
    .click({ force: true, log: false })
    .type(card, { force: true, log: false })
    .type('{enter}', { force: true, log: false })

    .then(() => {
      if (level) {
        return cy
          .get(s.CELL_FORM_LEVEL, { log: false })
          .select(String(level), { log: false })
      }
    })

    .then(() => {
      if (player) {
        return cy
          .get(
            player === 'RED' ? s.CELL_FORM_RED_RADIO : s.CELL_FORM_BLUE_RADIO,
            { log: false }
          )
          .click({ force: true, log: false })
      }
    })

    .then(() => {
      if (strength) {
        cy.get(s.CELL_FORM_STRENGTH, { log: false })
          .clear({ log: false })
          .type(String(strength), { log: false })
      }
    })

    .then(() => {
      if (poisoned) {
        cy.get(s.CELL_FORM_POISON_CHECKBOX, { log: false }).click({
          force: true,
          log: false,
        })
      }
    })

    .then(() => {
      if (frozen) {
        cy.get(s.CELL_FORM_FROZEN_CHECKBOX, { log: false }).click({
          force: true,
          log: false,
        })
      }
    })

    .get(s.CELL_FORM_BTN, { log: false })
    .click({ log: false })
}
