export const addUserPage = {

    selectors: {
        firstNameField: '#firstname'
    },
    
    addUser: (text) => {
        cy.get(addUserPage.selectors.firstNameField).type(text + 'aa')
        cy.get('#lastname').type(text + 'bb')
        cy.get('#email').type(text + '@test.pl')
        cy.get('#save').click()
    },

    clickCancel: () => {
        cy.get('.j_cancel_button').click()
    }

}