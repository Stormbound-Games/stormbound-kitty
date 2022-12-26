import s from './selectors'

describe('Battle Simulator — Layout', () => {
  beforeEach(() => cy.viewport('iphone-6').visit('/simulators/battle'))

  it('should be possible to open and close the cell panel', () => {
    cy.get(s.BOARD).should('be.visible')
    cy.get(s.SETTINGS_PANEL).should('not.be.visible')
    cy.get(s.CELL_PANEL).should('not.exist')

    cy.get(s.CELL_A1).should('be.visible').click()
    cy.get(s.CELL_PANEL).should('be.visible').find(s.PANEL_CLOSE_BTN).click()
    cy.get(s.CELL_PANEL).should('not.exist')
  })

  it('should be possible to open and close the settings panel', () => {
    cy.get(s.SETTINGS_PANEL_BTN).click()
    cy.get(s.SETTINGS_PANEL)
      .should('be.visible')
      .find(s.PANEL_CLOSE_BTN)
      .click()
    cy.get(s.SETTINGS_PANEL).should('not.be.visible')
  })

  it('should close the cell panel when filling a cell', () => {
    cy.wait(1000)
    cy.bsFill('A1', { card: 'Zhev' })
    cy.get(s.CELL_PANEL).should('not.exist')
  })
})
