import s from './selectors'

const assertCardType = (index, type) =>
  cy
    .get(s.CARD_PREVIEW)
    .eq(index)
    .find('[data-testid="card"]')
    .should('have.attr', 'data-type', type)

describe('Card Builder — Type', () => {
  let id = ''

  beforeEach(() => cy.visit(['/card', id].filter(Boolean).join('/')))

  afterEach(() =>
    cy.url().then(url => {
      let last = url.split('/').pop()
      if (last !== 'card') id = last
    })
  )

  it('should be possible to update the card faction', () => {
    cy.get(s.TYPE_SELECT).should('have.value', 'unit')
    cy.get(s.TYPE_SELECT)
      .should('be.visible')
      .select('spell')
      .should('have.value', 'spell')
    assertCardType(0, 'spell')
  })

  it('should be preserved upon reload', () => {
    cy.get(s.TYPE_SELECT).should('have.value', 'spell')
    assertCardType(0, 'spell')
  })
})
