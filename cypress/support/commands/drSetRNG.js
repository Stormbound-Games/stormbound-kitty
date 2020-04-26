const setRNG = mode => {
  Cypress.log({
    name: `RNG ${mode}`,
    message: `Set RNG mode to ${mode}`,
  })

  return cy
    .get('[data-testid="RNG-input"]', { log: false })
    .filter(`[value="${mode}"]`, { log: false })
    .parent({ log: false })
    .click({ log: false })
}

export default setRNG
