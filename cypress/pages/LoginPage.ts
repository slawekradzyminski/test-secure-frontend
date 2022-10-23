export default class LoginPage {

    static getUsernameInput = () => cy.get('[name=username]')
    static getPasswordInput = () => cy.get('[name=password]')
    static getLoginButton = () => cy.get('.btn-primary')

}