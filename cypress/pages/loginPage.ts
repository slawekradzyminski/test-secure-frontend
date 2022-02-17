import {  getElement } from "../util/selector"

export default class LoginPage {

    usernameField = getElement("[name=username]")
    passwordField = getElement('[name=password]')
    loginButton = getElement('.btn-primary')
    registerButton = getElement('.btn-link')
    invalidFeedback = getElement('.invalid-feedback')
    alert = getElement('.alert')

    login(username: string, password: string) {
        this.usernameField().type(username)
        this.passwordField().type(password)
        this.clickLogin()
    }

    clickRegister() {
        this.registerButton().click()
    }

    clickLogin() {
        this.loginButton().click()
    }
}