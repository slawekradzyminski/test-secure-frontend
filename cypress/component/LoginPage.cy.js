import React from 'react';
import {LoginPage} from '../../src/components/LoginPage';

describe('LoginPage', () => {
  it('playground', () => {
    cy.mount(<LoginPage/>, '/login')
    cy.get('.btn-primary').click()
  })
})