import './commands'

Cypress.on(
  'uncaught:exception',
  error =>
    !error.message.includes('ResizeObserver') &&
    !error.message.includes('Performance')
)
