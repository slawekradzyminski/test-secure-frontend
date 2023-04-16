import { UserRegister } from "../domain/user"

export default class RegisterPage {

    static selectors = {
        getUsernameInput: () => cy.get('[name=username]'),
        getPasswordInput: () => cy.get('[name=password]'),
        getFirstNameInput: () => cy.get('[name=firstName]'),
        getLastNameInput: () => cy.get('[name=lastName]'),
        getEmailInput: () => cy.get('[name=email]'),
        getRegisterButton: () => cy.get('.btn-primary'),
        getAlertMessage: () => cy.get('.alert')
    }

    static attemptRegister = (user: UserRegister) => {
        this.selectors.getUsernameInput().type(user.username)
        this.selectors.getPasswordInput().type(user.password)
        this.selectors.getFirstNameInput().type(user.firstName)
        this.selectors.getLastNameInput().type(user.lastName)
        this.selectors.getEmailInput().type(user.email)
        this.selectors.getRegisterButton().click()
    }
}
