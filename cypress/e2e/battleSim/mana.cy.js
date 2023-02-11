import s from './selectors'

describe('Battle Simulator — Mana', () => {
  let id = ''
  beforeEach(() =>
    cy.visit(['/simulators/battle', id].filter(Boolean).join('/'))
  )
  afterEach(() =>
    cy.url().then(url => {
      let last = url.split('/').pop()
      if (last !== 'battle') id = last
    })
  )

  it('should be possible to update current mana', () => {
    cy.get(s.MANA_INPUT).clear().type('9')
    cy.get(s.MANA).eq(0).should('contain', '9')
    cy.get(s.MANA).eq(1).should('contain', '9')
    cy.url().should('not.match', /battle$/)
  })

  it('should be preserved upon reload', () => {
    cy.reload()
    cy.get(s.MANA).eq(0).should('contain', '9')
  })
})
