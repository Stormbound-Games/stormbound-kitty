import s from './selectors'

describe('Card Builder — Race', () => {
  const assertCardRace = (index, value) =>
    cy
      .wait(500)
      .get(s.CARD_PREVIEW)
      .eq(index)
      .find(s.CARD_RACE)
      .invoke('text')
      .should('match', new RegExp(value, 'i'))

  const fill = value =>
    cy.get(s.RACE_INPUT).type(value + '{enter}', { force: true })

  const assertRaceEmpty = () =>
    cy
      .get(s.CARD_PREVIEW)
      .eq(0)
      .find(s.CARD_RACE)
      .invoke('text')
      .invoke('trim')
      .should('have.length', 0)

  const assertFieldDisplay = value =>
    cy
      .get(s.RACE_SELECT)
      .find('.RaceSelect__single-value')
      .invoke('text')
      .should('match', new RegExp(value, 'i'))

  const assertFieldEmpty = () =>
    cy
      .get(s.RACE_SELECT)
      .find('.RaceSelect__single-value')
      .invoke('text')
      .invoke('trim')
      .should('have.length', 0)

  const assertFieldDisabled = () =>
    cy.get(s.RACE_SELECT).find('input').first().and('be.disabled')

  before(() => {
    cy.visit('/card')
  })

  it('should be empty by default', () => {
    assertFieldEmpty()
  })

  it('should be possible to define the card race', () => {
    fill('knight')
    assertFieldDisplay('knight')
  })

  it('should be reflected in all preview', () => {
    for (let i = 0; i < 5; i++) assertCardRace(i, 'knight')
  })

  it('should be preserved upon reload', () => {
    cy.url()
      .should('not.match', /\/card$/)
      .reload()
    assertFieldDisplay('knight')
    for (let i = 0; i < 5; i++) assertCardRace(i, 'knight')
  })

  it('should be emptied if picking structure type', () => {
    cy.get(s.TYPE_SELECT).select('structure')
    assertFieldEmpty()
    assertFieldDisabled()
    assertRaceEmpty()
  })

  it('should be possible to fill a custom race', () => {
    cy.get(s.TYPE_SELECT).select('unit')
    fill('cat')
    assertFieldDisplay('cat')
    assertCardRace(0, 'cat')
  })

  it('should be preserved upon reload', () => {
    cy.wait(1000)
      .url()
      .should('not.match', /\/card$/)
      .reload()
    assertFieldDisplay('cat')
    for (let i = 0; i < 5; i++) assertCardRace(i, 'cat')
  })

  it('should be emptied if picking spell type', () => {
    cy.get(s.TYPE_SELECT).select('spell')
    assertFieldEmpty()
    assertFieldDisabled()
    assertRaceEmpty()
  })
})
