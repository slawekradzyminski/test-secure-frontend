class LoginPage {

    getUsernameInput = () => cy.get("input[name='username']")
    getPasswordInput = () => cy.get("input[name='password']")
    getLoginButton = () => cy.get('.btn-primary')
    getRegisterLink = () => cy.get('.btn-link')

}

// This file has a slightly different implementation comparing to other Pages
// It was intentional because we wanted to leave it for future comparison reasons
// It is recommended to never mix approaches in the same codebase

export const loginPage = new LoginPage()