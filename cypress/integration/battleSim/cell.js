import s from './selectors'

describe('Battle Simulator — Cells', () => {
  before(() => {
    cy.visit('/simulators/battle')
  })

  it('should be possible to select and unselect an cell', () => {
    cy.get(s.CELL_A1).click().should('have.attr', 'aria-pressed', 'true')
    cy.get('#cell-form-dialog [data-testid="cell-form-dialog-close"]').click()
    cy.get(s.CELL_A1).should('not.have.attr', 'aria-pressed')
  })

  it('should enable the cell settings', () => {
    cy.get(s.CELL_A1).click().get(s.CELL_FORM).should('be.visible')
  })

  it('should default player to BLUE', () => {
    cy.get(s.CELL_FORM_BLUE_RADIO).should('be.checked')
  })

  it('should fill the cell once form submitted', () => {
    cy.get(s.CELL_FORM_BTN)
      .should('be.disabled')
      .bsFill('A1', { card: 'Zhev', strength: 1 })
      .get(s.CELL_A1)
      .find(s.CELL_IMAGE)
      .get(s.CELL_A1)
      .find(s.CELL_STRENGTH)
      .then($strength => expect($strength).to.have.text('1'))
      .get(s.CELL_A1)
      .should('not.have.attr', 'aria-pressed', 'true')
  })

  it('should be possible to update the strength of a filled cell', () => {
    cy.get(s.CELL_A1)
      .click()
      .get(s.CELL_FORM_STRENGTH)
      .clear()
      .type('10')
      .get(s.CELL_FORM_BTN)
      .click()
      .get(s.CELL_A1)
      .find(s.CELL_STRENGTH)
      .then($strength => expect($strength).to.have.text('10'))
  })

  it('should be possible to update the level of a filled cell', () => {
    cy.get(s.CELL_A1)
      .click()
      .get(s.CELL_FORM_LEVEL)
      .select('5')
      .get(s.CELL_FORM_BTN)
      .click()
      .get(s.CELL_A1)
      .click()
      .get(s.CELL_FORM_LEVEL)
      .should('have.value', '5')
  })

  it('should be possible to update the player of a filled cell', () => {
    cy.get(s.CELL_A1)
      .find(s.CELL_STRENGTH)
      .should('have.attr', 'data-player', 'BLUE')
      .get(s.CELL_FORM_RED_RADIO)
      .click({ force: true })
      .get(s.CELL_FORM_BTN)
      .click()
      .get(s.CELL_A1)
      .find(s.CELL_STRENGTH)
      .should('have.attr', 'data-player', 'RED')
  })

  it('should be possible to update the poison status of a filled cell', () => {
    cy.get(s.CELL_A1)
      .click()
      .get(s.CELL_FORM_POISON_CHECKBOX)
      .click({ force: true })
      .get(s.CELL_FORM_BTN)
      .click()
      .get(s.CELL_A1)
      .find(s.CELL_POISONED)
      .should('be.visible')
  })

  it('should be possible to update the vitality status of a filled cell', () => {
    cy.get(s.CELL_A1)
      .click()
      .get(s.CELL_FORM_VITALITY_CHECKBOX)
      .click({ force: true })
      .get(s.CELL_FORM_BTN)
      .click()
      .get(s.CELL_A1)
      .find(s.CELL_VITALIZED)
      .should('be.visible')
  })

  it('should be possible to update the frozen status of a filled cell', () => {
    cy.get(s.CELL_A1)
      .click()
      .get(s.CELL_FORM_FROZEN_CHECKBOX)
      .click({ force: true })
      .get(s.CELL_FORM_BTN)
      .click()
      .get(s.CELL_A1)
      .find(s.CELL_FROZEN)
      .should('be.visible')
  })

  it('should be possible to update the card of a filled cell', () => {
    cy.get(s.CELL_A1)
      .click()
      .get(s.CELL_FORM_CARD_SELECT)
      .click({ force: true })
      .type('Moonlit', { force: true })
      .type('{enter}', { force: true })
      .get(s.CELL_FORM_BTN)
      .click()
      .get(s.CELL_A1)
      .should($cell => expect($cell.attr('title')).to.match(/Moonlit/))
  })

  it('should be impossible to update the frozen/vitality/poisoned statuses of a structure', () => {
    cy.get(s.CELL_A1)
      .click()
      .get(s.CELL_FORM_FROZEN_CHECKBOX)
      .should('be.disabled')
      .should('not.be.checked')
      .get(s.CELL_FORM_POISON_CHECKBOX)
      .should('be.disabled')
      .should('not.be.checked')
      .get(s.CELL_FORM_VITALITY_CHECKBOX)
      .should('be.disabled')
      .should('not.be.checked')
  })

  it('should be possible to empty a filled cell', () => {
    cy.get(s.CELL_FORM_REMOVE_BTN)
      .click()
      .get(s.CELL_A1)
      .should('not.have.attr', 'aria-pressed')
      .get(s.CELL_A1)
      .find(s.CELL_IMAGE)
      .should('not.exist')
      .get(s.CELL_A1)
      .find(s.CELL_STRENGTH)
      .should('not.exist')
  })

  it('should save a unit', () => {
    cy.bsFill('A1', { card: 'Zhev', strength: 5, player: 'RED' })
      .wait(3000)
      .reload()
      .get(s.CELL_A1)
      .should($cell => expect($cell.attr('title')).to.match(/Zhev/))
      .get(s.CELL_A1)
      .find(s.CELL_STRENGTH)
      .should('have.text', '5')
  })

  it('should save unit penalties', () => {
    cy.bsFill('B1', {
      card: 'Ubass',
      strength: 5,
      player: 'BLUE',
      poisoned: true,
      frozen: true,
      disabled: true,
      confused: true,
    })
      .wait(3000)
      .reload()
      .get(s.CELL_B1)
      .find(s.CELL_POISONED)
      .should('be.visible')
      .get(s.CELL_B1)
      .find(s.CELL_FROZEN)
      .should('be.visible')
      .get(s.CELL_B1)
      .find(s.CELL_DISABLED)
      .should('be.visible')
      .get(s.CELL_B1)
      .find(s.CELL_CONFUSED)
      .should('be.visible')
  })
})
