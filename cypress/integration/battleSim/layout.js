import s from './selectors'

describe('Battle Sim — Layout', () => {
  beforeEach(() => {
    cy.visit('/sim').viewport('iphone-6').wait(1000)
  })

  it('should display the board', () => {
    cy.get(s.BOARD)
      .should('be.visible')
      .get(s.SETTINGS_PANEL)
      .should('not.be.visible')
      .get(s.CELL_PANEL)
      .should('not.be.visible')
  })

  it('should display the cell panel when clicking a cell', () => {
    cy.get(s.CELL_A1).click().get(s.CELL_PANEL).should('be.visible')
  })

  it('should close the cell panel when filling a cell', () => {
    cy.fill('A1', { card: 'Zhev' }).get(s.CELL_PANEL).should('not.be.visible')
  })

  it('should be possible to open the settings panel', () => {
    cy.get(s.SETTINGS_PANEL_BTN)
      .click()
      .get(s.SETTINGS_PANEL)
      .should('be.visible')
  })

  it('should be possible to close the settings panel', () => {
    cy.get(s.SETTINGS_PANEL_BTN)
      .click()
      .get(s.SETTINGS_PANEL)
      .find(s.PANEL_CLOSE_BTN)
      .click()
      .get(s.SETTINGS_PANEL)
      .should('not.be.visible')
  })

  it('should be possible to close the cell panel', () => {
    cy.get(s.CELL_A1)
      .click()
      .get(s.CELL_PANEL)
      .find(s.PANEL_CLOSE_BTN)
      .click()
      .get(s.CELL_PANEL)
      .should('not.be.visible')
  })
})
