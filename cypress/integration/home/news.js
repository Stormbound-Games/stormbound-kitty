import s from './selectors'

describe('Home — News', () => {
  before(() => cy.visit('/'))

  it('should display latest news', () => {
    cy.get(s.NEWS_LIST).children().should('have.length', 7)
  })

  it('should be possible to browse older news', () => {
    cy.get(s.NEWS_LIST)
      .children()
      .first()
      .then($firstNews => {
        const text = $firstNews.text()

        cy.get(s.OLDER_BTN)
          .click()
          .get(s.NEWS_LIST)
          .children()
          .first()
          .then($newFirstNews => {
            expect($newFirstNews.text()).not.to.equal(text)
          })
      })
  })

  it('should be possible to browse newer news', () => {
    cy.get(s.NEWS_LIST)
      .children()
      .first()
      .then($firstNews => {
        const text = $firstNews.text()

        cy.get(s.RECENT_BTN)
          .click()
          .get(s.NEWS_LIST)
          .children()
          .first()
          .then($newFirstNews => {
            expect($newFirstNews.text()).not.to.equal(text)
          })
      })
  })
})
