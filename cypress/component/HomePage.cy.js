import React from 'react';
import {HomePage} from '../../src/components/HomePage';

describe('HomePage', () => {
  beforeEach(() => {
    const user = {
      token: 'fakeToken',
      roles: ['ROLE_ADMIN']
    }
    localStorage.setItem('user', JSON.stringify(user))
    cy.intercept('GET', '**/users', {fixture: 'users.json'})
  })

  it('display all users', () => {
    cy.mount(<HomePage/>, '/')
    cy.get('ul li').should('have.length', 3)
  })
})