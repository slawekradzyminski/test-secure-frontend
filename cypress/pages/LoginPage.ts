export default class LoginPage {

    static usernameInput = () => cy.get('[name=username]')
    static passwordInput = () => cy.get('[name=password]')
    static loginButton = () => cy.get('.btn-primary')
    static registerButton = () => cy.get('.btn-link')

}