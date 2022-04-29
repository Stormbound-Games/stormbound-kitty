const paste = (subject, payload) => {
  Cypress.log({
    name: 'PASTE',
    message: `Paste ${payload}`,
    consoleProps: () => ({ payload }),
  })

  return cy
    .wrap(subject)
    .invoke('val', payload)
    .trigger('paste', {
      eventConstructor: 'ClipboardEvent',
      bubbles: true,
      cancelable: true,
      clipboardData: {
        getData: type =>
          type === 'application/json' ? JSON.stringify(payload) : payload,
      },
    })
}

export default paste
