export default class LoginPage {
    static getLoginButton = () => cy.get('.btn-primary')
    static getPasswordInput = () => cy.get('input[name=password]')
    static getUsernameInput = () => cy.get('input[name=username]')
    static getRegisterButton = () => cy.get('.btn-link')
    static getValidationError = () => cy.get('.invalid-feedback')
    static getExclamationMark = () => cy.get('.is-invalid')

}