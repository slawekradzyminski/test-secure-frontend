// To jest plik w którym importujemy komendy rozszerzające funkcjonalności Cypressa

import './commands'
import '@percy/cypress'

beforeEach('This will run before all our tests', () => {
    cy.log('Hello from e2e.ts')
})