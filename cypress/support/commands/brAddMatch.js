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

  cy.get(s.OPPONENT_HEALTH_INPUT)
    .type(health)

    .get(s.OPPONENT_FACTION_SELECT)
    .select(faction)

    .get(s.OUTCOME_SELECT)
    .select(outcome)

    .get(s.BONUS_SELECT)
    .select(bonus)

    .get(s.MATCH_SUBMIT_BTN)
    .click()
}

export default addMatch
