import s from '../../integration/brawl/selectors'

const addMatch = (
  outcome,
  health = 20,
  faction = 'winter',
  bonus = 'COINS'
) => {
  Cypress.log({
    name: 'ADD_MATCH',
    message: 'Adding a match',
    consoleProps: () => ({ health, faction, outcome, bonus }),
  })

  cy.get(s.OPPONENT_HEALTH_INPUT, { log: false })
    .type(health, { log: false })

    .get(s.OPPONENT_FACTION_SELECT, { log: false })
    .select(faction, { log: false })

    .get(s.OUTCOME_SELECT, { log: false })
    .select(outcome, { log: false })

    .get(s.BONUS_SELECT, { log: false })
    .select(bonus, { log: false })

    .get(s.MATCH_SUBMIT_BTN, { log: false })
    .click({ log: false })
}

export default addMatch
