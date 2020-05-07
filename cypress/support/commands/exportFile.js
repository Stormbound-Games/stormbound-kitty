export default subject => {
  Cypress.log({
    name: `EXPORT_FILE`,
    message: 'Export file',
  })

  cy.wrap(subject, { log: false })
    .click({ log: false })
    .get('[data-testid="export-blob"]', { log: false })
    .then(
      $anchor =>
        new Cypress.Promise((resolve, reject) => {
          // Use XHR to get the blob that corresponds to the object URL.
          const xhr = new XMLHttpRequest()
          xhr.open('GET', $anchor.attr('href'), true)
          xhr.responseType = 'blob'
          $anchor.remove()

          // Once loaded, use FileReader to get the string back from the blob.
          xhr.onload = () => {
            if (xhr.status === 200) {
              const blob = xhr.response
              const reader = new FileReader()
              reader.onload = () => {
                // Once we have a string, resolve the promise to let
                // the Cypress chain continue, e.g. to assert on the result.
                resolve(reader.result)
              }
              reader.readAsText(blob)
            }
          }

          xhr.send()
        })
    )
}
