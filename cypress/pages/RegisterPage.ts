import { User } from "../utils/user"

export default class RegisterPage {
    static firstnameInput = () => cy.get('[name=firstName]')
    static lastnameInput = () => cy.get('[name=lastName]')
    static usernameInput = () => cy.get('[name=username]')
    static emailInput = () => cy.get('[name=email]')
    static passwordInput = () => cy.get('[name=password]')
    static registerButton = () => cy.get('.btn-primary')

    static attemptRegister = (user: User) => {
        RegisterPage.usernameInput().type(user.username)
        RegisterPage.lastnameInput().type(user.lastName)
        RegisterPage.firstnameInput().type(user.firstName)
        RegisterPage.passwordInput().type(user.password)
        RegisterPage.emailInput().type(user.email)
        RegisterPage.registerButton().click()
    }

}
