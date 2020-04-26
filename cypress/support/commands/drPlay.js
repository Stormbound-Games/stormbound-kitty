import s from '../../integration/dryRunner/selectors'
import getRawCardData from '../../../src/helpers/getRawCardData'

const play = id => {
  const { name } = getRawCardData(id)

  Cypress.log({
    name: `PLAY`,
    message: `Play ‘${name}’ (${id})`,
  })

  cy.drSelect(id, { log: false })
    .get(s.PLAY_BTN, { log: false })
    .click({ log: false })
}

export default play
