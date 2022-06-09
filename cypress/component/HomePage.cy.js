import React from 'react';
import {HomePage} from '../../src/components/HomePage';

describe('HomePage', () => {
  it('display all users', () => {
    const user = {
      token: 'fakeToken',
      roles: ['ROLE_ADMIN']
    }
    localStorage.setItem('user', JSON.stringify(user))
    cy.intercept('GET', '**/users', {fixture: 'users.json'})
    cy.mount(<HomePage/>, '/')
    cy.get('ul li').should('have.length', 3)
  })
})