export const registerPage = {

    selectors: {
        firstNameInput: () => cy.get('[name=firstName]'),
        lastNameInput: () => cy.get('[name=lastName]'),
        usernameField: () => cy.get('[name=username]'),
        passwordInput: () => cy.get('[name=password]'),
        emailInput: () => cy.get('[name=email]'),
        registerButton: () => cy.get('.btn.btn-primary'),
        alertMessage: () => cy.get('.alert'),
        invalidFeedbackMessages: () => cy.get('.invalid-feedback'),
        listOfInputs: () => cy.get('input')
    },

    triggerValidation: () => {
        registerPage.selectors.registerButton().click()
    }
}
