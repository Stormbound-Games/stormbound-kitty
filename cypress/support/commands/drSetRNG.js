import s from '../../integration/dryRunner/selectors'

const setRNG = mode => {
  Cypress.log({
    name: `RNG ${mode}`,
    message: `Set RNG mode to ${mode}`,
  })

  return cy.get(s[`${mode}_RNG_RADIO`]).parent().click()
}

export default setRNG
