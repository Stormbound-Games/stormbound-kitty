import s from '../../integration/brawl/selectors'

const addMatch = (outcome, health = 20, faction = 'winter') => {
  Cypress.log({
    name: 'ADD_MATCH',
    message: 'Adding a match',
    consoleProps: () => ({ health, faction, outcome }),
  })

  cy.get(s.OPPONENT_HEALTH_INPUT)
    .type(health)

    .get(s.OPPONENT_FACTION_SELECT)
    .select(faction)

    .get(s.OUTCOME_SELECT)
    .select(outcome)

    .get(s.MATCH_SUBMIT_BTN)
    .click()
}

export default addMatch
