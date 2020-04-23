import s from '../../integration/deckBuilder/selectors'

const select = id => {
  if (typeof id === 'number') {
    return cy
      .get(s.CARD, { log: false })
      .eq(id, { log: false })
      .then($card => select($card.attr('id')))
  }

  Cypress.log({
    name: `Select ${id}`,
    message: `Select card ${id}`,
  })

  return cy
    .get(s.CARD)
    .filter('#' + id)
    .as('card')
    .prev('button')
    .click()
}

export default select
