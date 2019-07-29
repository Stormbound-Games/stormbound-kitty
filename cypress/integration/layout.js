import s from './selectors'

describe('Layout', () => {
  before(() => {
    cy.visit('/sim')
  })

  it('should display the board', () => {
    cy.viewport('iphone-6')
      .wait(1000)
      .get(s.BOARD)
      .should('be.visible')
      .get(s.SETTINGS_PANEL)
      .should('not.be.visible')
      .get(s.CELL_PANEL)
      .should('not.be.visible')
  })

  it('should display the cell panel when clicking a cell', () => {
    cy.viewport('iphone-6')
      .wait(1000)
      .get(s.CELL_A1)
      .click()
      .get(s.CELL_PANEL)
      .should('be.visible')
  })

  it('should close the cell panel when filling a cell', () => {
    cy.viewport('iphone-6')
      .wait(1000)
      .fill('A1', { card: 'Zhev' })
      .get(s.CELL_PANEL)
      .should('not.be.visible')
  })

  it('should be possible to open the settings panel', () => {
    cy.viewport('iphone-6')
      .wait(1000)
      .get(s.SETTINGS_PANEL_BTN)
      .click()
      .get(s.SETTINGS_PANEL)
      .should('be.visible')
  })

  it('should be possible to close the settings panel', () => {
    cy.viewport('iphone-6')
      .wait(1000)
      .get(s.SETTINGS_PANEL_BTN)
      .click()
      .get(s.SETTINGS_PANEL)
      .find(s.PANEL_CLOSE_BTN)
      .click()
      .get(s.SETTINGS_PANEL)
      .should('not.be.visible')
  })

  it('should be possible to close the cell panel', () => {
    cy.viewport('iphone-6')
      .wait(1000)
      .get(s.CELL_A1)
      .click()
      .get(s.CELL_PANEL)
      .find(s.PANEL_CLOSE_BTN)
      .click()
      .get(s.CELL_PANEL)
      .should('not.be.visible')
  })
})
