export default class LoginScreen {

    static getUsernameInput = () => cy.get('[name=username]')
    static getPasswordInput = () => cy.get('[name=password]')
    static getLoginButton = () => cy.get('.btn-primary')
    static getRegisterButton = () => cy.get('.btn-link')

    static attemptLogin = (username, password) => {
        LoginScreen.getUsernameInput().type(username)
        LoginScreen.getPasswordInput().type(password)
        LoginScreen.getLoginButton().click()
    }

}