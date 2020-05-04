const setRNG = mode => {
  Cypress.log({
    name: 'SET_RNG',
    message: `Set RNG mode to ${mode}`,
    consoleProps: () => ({ mode }),
  })

  return cy
    .get('[data-testid="RNG-input"]', { log: false })
    .filter(`[value="${mode}"]`, { log: false })
    .click({ log: false, force: true })
}

export default setRNG
