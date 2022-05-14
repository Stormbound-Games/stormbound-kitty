import s from './selectors'

describe('Battle Simulator — Layout', () => {
  beforeEach(() => {
    cy.viewport('iphone-6')
    cy.visit('/simulators/battle')
    cy.get(s.BOARD).should('be.visible')
  })

  it('should display the board', () => {
    cy.get(s.SETTINGS_PANEL).should('not.be.visible')
    cy.get(s.CELL_PANEL).should('not.exist')
  })

  it('should display the cell panel when clicking a cell', () => {
    cy.get(s.CELL_A1).click()
    cy.get(s.CELL_PANEL).should('be.visible')
  })

  it('should close the cell panel when filling a cell', () => {
    cy.bsFill('A1', { card: 'Zhev' })
    cy.get(s.CELL_PANEL).should('not.exist')
  })

  it('should be possible to open the settings panel', () => {
    cy.get(s.SETTINGS_PANEL_BTN).click()
    cy.get(s.SETTINGS_PANEL).should('be.visible')
  })

  it('should be possible to close the settings panel', () => {
    cy.get(s.SETTINGS_PANEL_BTN).click()
    cy.get(s.SETTINGS_PANEL).find(s.PANEL_CLOSE_BTN).click()
    cy.get(s.SETTINGS_PANEL).should('not.be.visible')
  })

  it('should be possible to close the cell panel', () => {
    cy.get(s.CELL_A1).click()
    cy.get(s.CELL_PANEL).find(s.PANEL_CLOSE_BTN).click()
    cy.get(s.CELL_PANEL).should('not.be.visible')
  })
})
