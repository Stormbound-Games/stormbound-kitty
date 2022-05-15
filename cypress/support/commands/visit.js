const visit = (originalFn, url, options) => {
  return cy
    .wrap(originalFn(url, options), { log: false })
    .its('__cypress_ready', { log: false })
    .should('eq', true)
}

export default visit
