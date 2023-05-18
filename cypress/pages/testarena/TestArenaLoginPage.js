export default class TestArenaLoginPage {

    static getEmailField = () => cy.get('#email')
    static getPasswordField = () => cy.get('#password')
    static getLoginButton = () => cy.get('#login')

    static attemptLogin = (email, password) => {
        TestArenaLoginPage.getEmailField().type(email)
        TestArenaLoginPage.getPasswordField().type(password)
        TestArenaLoginPage.getLoginButton().click()
    }
}