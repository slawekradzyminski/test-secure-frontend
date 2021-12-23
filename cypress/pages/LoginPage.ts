class LoginPage {

    login(username: string, password: string) {
        cy.get('[name=username]').type(username)
        cy.get('[name=password]').type(password)
        cy.get('.btn-primary').click()
    }

}

export default LoginPage