import LoginPage from "../pages/loginPage";

export default class LoginPageAssertions {
    
    private readonly loginPage: LoginPage = new LoginPage();

    verifyFrontendValidation() {
        this.loginPage.invalidFeedback().eq(1).should('have.text', 'Required field length is 4 or more')
        this.loginPage.usernameField().should('have.class', 'is-invalid')
        this.loginPage.passwordField().should('have.class', 'is-invalid')
    }

}