import React from 'react';
import {HomePage} from '../../src/components/HomePage';

describe('HomePage', () => {
  it('playground', () => {
    const user = {
      token: 'fakeToken',
      roles: ['ROLE_ADMIN']
    }
    localStorage.setItem('user', JSON.stringify(user))
    cy.intercept('GET', '**/users', {fixture: 'users.json'})
    cy.mount(<HomePage/>, '/')
  })
})