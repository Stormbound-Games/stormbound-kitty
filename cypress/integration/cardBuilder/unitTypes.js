import s from './selectors'

describe('Card Builder — Unit types', () => {
  const assertCardUnitTypes = (index, value) =>
    cy
      .wait(500)
      .get(s.CARD_PREVIEW)
      .eq(index)
      .find(s.CARD_UNIT_TYPES)
      .invoke('text')
      .should('match', new RegExp(value, 'i'))

  const fill = value =>
    cy.get(s.UNIT_TYPES_INPUT).type(value + '{enter}', { force: true })

  const assertUnitTypeEmpty = () =>
    cy
      .get(s.CARD_PREVIEW)
      .eq(0)
      .find(s.CARD_UNIT_TYPES)
      .invoke('text')
      .invoke('trim')
      .should('have.length', 0)

  const assertFieldDisplay = value =>
    cy
      .get(s.UNIT_TYPES_SELECT)
      .find('.UnitTypeSelect__multi-value')
      .invoke('text')
      .should('match', new RegExp(value, 'i'))

  const assertFieldEmpty = () =>
    cy
      .get(s.UNIT_TYPES_SELECT)
      .find('.UnitTypeSelect__multi-value')
      .should('not.exist')

  const assertFieldDisabled = () =>
    cy.get(s.UNIT_TYPES_SELECT).find('input').first().and('be.disabled')

  before(() => {
    cy.visit('/card')
  })

  it('should be empty by default', () => {
    assertFieldEmpty()
  })

  it('should be possible to pick an existing unit type', () => {
    fill('knight')
    assertFieldDisplay('knight')
    for (let i = 0; i < 5; i++) assertCardUnitTypes(i, 'knight')
  })

  it('should be preserved upon reload', () => {
    cy.url()
      .should('not.match', /\/card$/)
      .reload()
    assertFieldDisplay('knight')
    for (let i = 0; i < 5; i++) assertCardUnitTypes(i, 'knight')
  })

  it('should be emptied if picking structure type', () => {
    cy.get(s.TYPE_SELECT).select('structure')
    assertFieldEmpty()
    assertFieldDisabled()
    assertUnitTypeEmpty()
  })

  it('should be possible to fill a custom unit type', () => {
    cy.get(s.TYPE_SELECT).select('unit')
    fill('cat')
    assertFieldDisplay('cat')
    assertCardUnitTypes(0, 'cat')
  })

  it('should be preserved upon reload', () => {
    cy.wait(1000)
      .url()
      .should('not.match', /\/card$/)
      .reload()
    assertFieldDisplay('cat')
    for (let i = 0; i < 5; i++) assertCardUnitTypes(i, 'cat')
  })

  it('should be emptied if picking spell type', () => {
    cy.get(s.TYPE_SELECT).select('spell')
    assertFieldEmpty()
    assertFieldDisabled()
    assertUnitTypeEmpty()
  })

  it.skip('should be possible to define multiple unit types', () => {
    fill('knight')
    assertFieldDisplay('knight')
    assertCardUnitTypes(0, 'knight')
    fill('cat')
    assertFieldDisplay('cat')
    assertCardUnitTypes(0, 'cat')
  })
})
