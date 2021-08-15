import '@cypress/react/support'
import './commands'

Cypress.on(
  'uncaught:exception',
  error => !error.message.includes('ResizeObserver')
)
