Cypress.Commands.add('getById', id => {
    return cy.get(`[data-id=${id}]`)
})
