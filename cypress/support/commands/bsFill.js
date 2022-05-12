import s from '../../integration/battleSim/selectors'

const bsFill = (
  subject,
  cell,
  {
    card,
    level,
    strength,
    player,
    poisoned,
    vitalized,
    frozen,
    disabled,
    confused,
  }
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
      vitalized,
      frozen,
      disabled,
      confused,
    }),
  })

  cy.get(`[data-testid="cell-${cell}"]`, { log: false }).then($cell => {
    if (String($cell.attr('aria-pressed')) !== 'true') {
      cy.wrap($cell, { log: false }).click({ log: false })
    }
  })

  cy.get(s.CELL_FORM_CARD_SELECT, { log: false }).type(card + '{enter}', {
    force: true,
    log: false,
  })

  if (level) {
    cy.get(s.CELL_FORM_LEVEL, { log: false }).select(String(level), {
      log: false,
    })
  }

  if (player) {
    cy.get(player === 'RED' ? s.CELL_FORM_RED_RADIO : s.CELL_FORM_BLUE_RADIO, {
      log: false,
    }).click({ log: false })
  }

  if (strength) {
    cy.get(s.CELL_FORM_STRENGTH, { log: false })
      .clear({ log: false })
      .type(String(strength), { log: false })
  }

  if (poisoned) {
    cy.get(s.CELL_FORM_POISON_CHECKBOX, { log: false }).click({ log: false })
  } else if (vitalized) {
    cy.get(s.CELL_FORM_VITALITY_CHECKBOX, { log: false }).click({ log: false })
  }

  if (frozen) {
    cy.get(s.CELL_FORM_FROZEN_CHECKBOX, { log: false }).click({ log: false })
  }

  if (confused) {
    cy.get(s.CELL_FORM_CONFUSED_CHECKBOX, { log: false }).click({ log: false })
  }

  if (disabled) {
    cy.get(s.CELL_FORM_DISABLED_CHECKBOX, { log: false }).click({ log: false })
  }

  cy.url({ log: false }).then($url => {
    cy.get(s.CELL_FORM_BTN, { log: false })
      .click({ log: false })

      .url({ log: false })
      .should('not.eq', $url)
  })
}

export default bsFill
