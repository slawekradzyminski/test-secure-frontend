import LoginPage from "../pages/loginPage";

export default class LoginPageAssertions extends LoginPage {

    verifyFrontendValidation() {
        cy.get(this.invalidFeedback).eq(0).should('have.text', 'Required field length is 4 or more')
        cy.get(this.invalidFeedback).eq(1).should('have.text', 'Required field length is 4 or more')
        cy.get(this.usernameField).should('have.class', 'is-invalid')
        cy.get(this.passwordField).should('have.class', 'is-invalid')
    }

}