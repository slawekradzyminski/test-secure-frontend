export default class LoginPage {

    static attemptLogin = (username: string, password: string) => {
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        LoginPage.clickLogin()
    }

    static clickRegister = () => {
        cy.get('.btn-link').click()
    }

    static clickLogin = () => {
        cy.get('.btn-primary').click()
    }

}