export default class RegisterPage {

    static firstNameInput = () => cy.get('[name=firstName]')
    static lastNameInput = () => cy.get('[name=lastName]')
    static usernameInput = () => cy.get('[name=username]')
    static passwordInput = () => cy.get('[name=password]')
    static emailInput = () => cy.get('[name=email]')
    static registerButton = () => cy.get('.btn-primary')
    static cancelLink = () => cy.get('.btn-link')

}