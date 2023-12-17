import { User } from "../domain/user"

export const loginPageselectors = {
    loginInput: '[name=username]',
    passwordInput: '[name=password]'
}

export const loginPage = {
    clickRegister: () => cy.get('.btn-link').click(),

    attemptLogin: (user: User) => {
        cy.get(loginPageselectors.loginInput).type(user.username)
        cy.get(loginPageselectors.passwordInput).type(user.password)
        loginPage.clickLogin()
    },

    clickLogin: () => {
        cy.get('.btn-primary').click()
    }

}