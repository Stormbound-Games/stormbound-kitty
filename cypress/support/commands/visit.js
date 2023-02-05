const visit = (originalFn, url, options = {}) => {
  const token = Cypress.env('SANITY_STUDIO_PREVIEW_TOKEN')
  const noLogs = { log: false }

  if (token && !options.previewEnabled) {
    return cy
      .log('Enabling preview mode')
      .wrap(originalFn(`/api/preview?token=${token}&type=siteSettings`), {
        ...noLogs,
        timeout: 10000,
      })
      .then(() => visit(originalFn, url, { ...options, previewEnabled: true }))
  }

  return cy
    .wrap(originalFn(url, options), noLogs)
    .its('__cypress_ready', noLogs)
    .should('eq', true)
}

export default visit
