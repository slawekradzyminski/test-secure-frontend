class LoginPage {

    getRegisterLink = () => cy.get('.btn-link')

    attemptLogin = (username: string, password: string) => {
        cy.get("input[name='username']").type(username)
        cy.get("input[name='password']").type(password)
        cy.get('.btn-primary').click()
    }

}

// This file has a slightly different implementation comparing to other Pages
// It was intentional because we wanted to leave it for future comparison reasons
// It is recommended to never mix approaches in the same codebase

export const loginPage = new LoginPage()