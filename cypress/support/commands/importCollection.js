export default (subject, name) => {
  Cypress.log({
    name: `LOAD_COLLECTION`,
    message: 'Load collection',
    consoleProps: () => ({ name }),
  })

  cy.fixture(name, { log: false })
    .as('csv')
    .then(function () {
      cy.wrap(subject, { log: false }).trigger('change', {
        log: false,
        force: true,
        file: {
          name,
          type: 'text/csv',
          data: this.csv,
        },
      })
    })
}
