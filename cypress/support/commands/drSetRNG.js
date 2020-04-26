const setRNG = mode => {
  Cypress.log({
    name: `RNG ${mode}`,
    message: `Set RNG mode to ${mode}`,
  })

  return cy
    .get('[data-testid="RNG-input"]')
    .filter(`[value="${mode}"]`)
    .parent()
    .click()
}

export default setRNG
