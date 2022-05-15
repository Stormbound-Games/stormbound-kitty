const reload = originalFn => {
  return cy
    .wrap(originalFn(), { log: false })
    .its('__cypress_ready', { log: false })
    .should('eq', true)
}

export default reload
