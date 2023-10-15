import './commands'
import '@percy/cypress';

beforeEach('setup', () => {
    cy.log('This will be logged before each test')
})