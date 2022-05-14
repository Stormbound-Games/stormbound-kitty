import s from './selectors'

describe('Battle Simulator — Cells', () => {
  before(() => {
    cy.visit('/simulators/battle')
  })

  it('should be possible to select and unselect an cell', () => {
    cy.get(s.CELL_A1).click().should('have.attr', 'aria-pressed', 'true')
    cy.get(s.CELL_FORM).should('be.visible')
    cy.get('#cell-form-dialog [data-testid="cell-form-dialog-close"]').click()
    cy.get(s.CELL_A1).should('not.have.attr', 'aria-pressed')
  })

  it('should fill the cell once form submitted', () => {
    cy.url().then(currentUrl => {
      cy.bsFill('A1', { card: 'Zhev', strength: 1 })
      cy.get(s.CELL_A1).find(s.CELL_STRENGTH).should('contain', '1')
      cy.url().should('not.eq', currentUrl)
    })
  })

  it('should be possible to update a filled cell', () => {
    cy.url().then(currentUrl => {
      cy.get(s.CELL_A1).click()
      cy.get(s.CELL_FORM_CARD_SELECT).type('Sparkl{enter}', { force: true })
      cy.get(s.CELL_FORM_LEVEL).select('5')
      cy.get(s.CELL_FORM_STRENGTH).clear().type('10')
      cy.get(s.CELL_FORM_RED_RADIO).click({ force: true })
      cy.get(s.CELL_FORM_POISON_CHECKBOX).click({ force: true })
      cy.get(s.CELL_FORM_FROZEN_CHECKBOX).click({ force: true })
      cy.get(s.CELL_FORM_CONFUSED_CHECKBOX).click({ force: true })
      cy.get(s.CELL_FORM_DISABLED_CHECKBOX).click({ force: true })
      cy.get(s.CELL_FORM_BTN).click()
      cy.url().should('not.eq', currentUrl)
      cy.get(s.CELL_A1).should($cell => {
        const title = $cell.attr('title')
        expect(title).to.match(/Sparkl/)
        expect(title).to.match(/lvl 5/)
        expect(title).to.match(/10-strength/)
        expect(title).to.match(/enemy/)
        expect(title).to.match(/poisoned/)
        expect(title).to.match(/confused/)
        expect(title).to.match(/frozen/)
        expect(title).to.match(/disabled/)
      })
    })
  })

  it('should be possible to update the vitality status of a filled cell', () => {
    cy.get(s.CELL_A1).click() // Don’t ask me…
    cy.url().then(currentUrl => {
      cy.get(s.CELL_A1).click()
      cy.get(s.CELL_FORM_VITALITY_CHECKBOX).click({ force: true })
      cy.get(s.CELL_FORM_BTN).should('be.visible').click()
      cy.get(s.CELL_A1).should($cell => {
        expect($cell.attr('title')).not.to.match(/poisoned/)
        expect($cell.attr('title')).to.match(/vitalized/)
      })
      cy.url().should('not.eq', currentUrl)
    })
  })

  it('should be possible to empty a filled cell', () => {
    cy.get(s.CELL_A1).click() // Don’t ask me…
    cy.url().then(currentUrl => {
      cy.get(s.CELL_A1).click()
      cy.get(s.CELL_FORM_REMOVE_BTN).should('be.visible').click()
      cy.get(s.CELL_A1).find(s.CELL_IMAGE).should('not.exist')
      cy.get(s.CELL_A1).find(s.CELL_STRENGTH).should('not.exist')
      cy.url().should('not.eq', currentUrl)
    })
  })

  it('should be preserved upon reload', () => {
    cy.get(s.CELL_A1).click() // Don’t ask me…
    cy.url().then(currentUrl => {
      cy.bsFill('A1', {
        card: 'Zhev',
        strength: 5,
        player: 'RED',
        poisoned: true,
        frozen: true,
        disabled: true,
        confused: true,
      })
        .url()
        .should('not.eq', currentUrl)
    })
    cy.reload()
    cy.get(s.CELL_A1).should($cell => {
      const title = $cell.attr('title')
      expect(title).to.match(/Zhev/)
      expect(title).to.match(/5-strength/)
      expect(title).to.match(/enemy/)
      expect(title).to.match(/poisoned/)
      expect(title).to.match(/confused/)
      expect(title).to.match(/frozen/)
      expect(title).to.match(/disabled/)
    })
  })

  it('should be impossible to update the frozen/vitality/poisoned statuses of a structure', () => {
    cy.get(s.CELL_A1).click()
    cy.get(s.CELL_FORM_CARD_SELECT).type('Moonlit{enter}', { force: true })
    cy.get('[data-testid="cell-status-effects"]').should('be.disabled')
  })
})
