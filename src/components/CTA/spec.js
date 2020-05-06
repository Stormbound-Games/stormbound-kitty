import React from 'react'
import { mount } from 'cypress-react-unit-test'
import CTA from './'

describe('The `CTA` component', () => {
  it('should render a link', () => {
    mount(<CTA href='/'>Hello</CTA>)

    cy.get('a').should('exist').should('have.attr', 'href', '/')
  })

  it('should render a button', () => {
    mount(<CTA onClick={() => {}}>Hello</CTA>)

    cy.get('button').should('exist').should('not.have.attr', 'href')
  })
})
