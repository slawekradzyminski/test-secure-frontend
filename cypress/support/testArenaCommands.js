Cypress.Commands.add('loginToTestArena', (email, password) => {
        cy.visit('http://demo.testarena.pl/zaloguj')
        cy.get('#email').type(email)
        cy.get('#password').type(password)
        cy.get('#login').click()
})
