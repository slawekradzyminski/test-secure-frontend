import { User } from "../utils/user"

export default class RegisterPage {

    private static firstNameInput = () => cy.get('[name=firstName]')
    private static lastNameInput = () => cy.get('[name=lastName]')
    private static usernameInput = () => cy.get('[name=username]')
    private static passwordInput = () => cy.get('[name=password]')
    private static emailInput = () => cy.get('[name=email]')
    private static registerButton = () => cy.get('.btn-primary')
    private static cancelLink = () => cy.get('.btn-link')

    static attemptRegister = (user: User) => {
        RegisterPage.firstNameInput().type(user.firstName)
        RegisterPage.lastNameInput().type(user.lastName)
        RegisterPage.usernameInput().type(user.username)
        RegisterPage.passwordInput().type(user.password)
        RegisterPage.emailInput().type(user.email)
        RegisterPage.registerButton().click()
    }

    static clickCancel = () => {
        RegisterPage.cancelLink().click()
    }
}