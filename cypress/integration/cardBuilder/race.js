import s from './selectors'

describe('Card Builder — Race', () => {
  const race = 'knight'
  const assertCardRace = index =>
    cy.get(s.CARD_PREVIEW).eq(index).find(s.CARD_RACE).should('contain', race)

  before(() => {
    cy.visit('/card')
  })

  it('should be empty by default', () => {
    cy.get(s.RACE_SELECT).should('have.value', '')
  })

  it('should be possible to define the card race', () => {
    cy.get(s.RACE_SELECT).select(race).should('have.value', race)
  })

  it('should be reflected in all preview', () => {
    for (let i = 0; i < 5; i++) assertCardRace(i)
  })

  it('should be preserved upon reload', () => {
    cy.url()
      .should('not.match', /\/card$/)
      .reload()
    cy.get(s.RACE_SELECT).should('have.value', race)
    for (let i = 0; i < 5; i++) assertCardRace(i)
  })

  it('should be emptied if picking structure type', () => {
    cy.get(s.TYPE_SELECT).select('structure')
    cy.get(s.RACE_SELECT).should('have.value', '').and('be.disabled')
    cy.get(s.CARD_PREVIEW)
      .eq(0)
      .find(s.CARD_RACE)
      .should($node => expect($node.text().trim()).to.have.length(0))
  })

  it('should be emptied if picking spell type', () => {
    cy.get(s.TYPE_SELECT).select('spell')
    cy.get(s.RACE_SELECT).should('have.value', '').and('be.disabled')
    cy.get(s.CARD_PREVIEW)
      .eq(0)
      .find(s.CARD_RACE)
      .should($node => expect($node.text().trim()).to.have.length(0))
  })
})
