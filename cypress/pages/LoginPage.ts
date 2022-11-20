export default class LoginPage {

    static getLoginInput = () => cy.get('[name=username]')
    static getPasswordInput = () => cy.get('[name=password]')
    static getLoginButton = () => cy.get('.btn-primary')

}