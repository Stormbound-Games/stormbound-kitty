describe('Routes — List builder', () => {
  it('it should render', () => {
    cy.visit('/list').get('main h1').should('exist')
  })

  it('it should render the equals tier list', () => {
    cy.visit('/list/equals/display').get('main h1').should('exist')
  })

  it('it should render the ranked tier list', () => {
    cy.visit('/list/ranked/display').get('main h1').should('exist')
  })

  it('it should render the display mode', () => {
    cy.visit(
      '/list/U1MsSTJOOE40Nk42O1MsUzI0VzVXNlcxM0kyMEkxN0Y1RjhGMTZGMjBOMU4xMU4xOU4yMk42ME40N0k3UzEySTE5O0EsUzE2UzIxUzE4UzIyVzhXMlcxMFcxOEkxSTVJMTBJMTZJMjFGMUYzRjExRjEzRjE3RjIxTjE1TjE3TjE4TjI1TjQyTjQ1TjU3TjU4O0IsUzRTN1M4UzE0VzFXM1c3VzE0VzE1VzE2VzIzSTNJOEkxMUk2STIzRjJGN0YxMkYxNEYxOEYyMk41TjdOMjZOMzZONTJONTRONTVTMTlGMTU7QyxTMVMzUzVTMTFTMjNXNFc5VzEyVzIxSTRJOUkxM0kyNEY2RjlGMTBGNEYxOUYyM04yTjROMTBOMTZOMjBONjROMzhOMzlONDM7RCxTNlMyUzlTMTNTMTdXMTFXMjBJMTVJMTJJMThJMjJOMjNONTlOMjFONDFOMjROMzBOMzJOMzNOMzVOMzdONDBONDhONDlONTBONTE7RSxTMTVTMjBXMTdXMTlXMjJJMTRGMjROM042Mk4xMk4xNE42M04yOE42MU40NE41M041Nk4yOTtGLFMxMFcyNE45TjI3TjMxO04uQS4sTjY1TjY2/display'
    )
      .get('main h1')
      .should('exist')
  })
})
