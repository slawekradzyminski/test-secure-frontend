import React from 'react';
import {LoginPage} from '../../src/components/LoginPage';

describe('LoginPage', () => {
  it('should show errors', () => {
    cy.mount(<LoginPage/>, '/login')
    cy.get('.btn-primary').click()
    cy.get('.invalid-feedback').should('be.visible')
  })
})