export default class RegisterPage {

    static clickRegister = () => {
        cy.get('.btn-primary').click()
    }

    static clickCancel = () => {
        cy.get('.btn-link').click()
    }

    static attemptRegister = (user) => {
        cy.get("[name=username]").type(user.username)
        cy.get("[name=firstName]").type(user.firstName)
        cy.get("[name=lastName]").type(user.lastName)
        cy.get("[name=password]").type(user.password)
        cy.get("[name=email]").type(user.email)
        cy.get(".btn-primary").click()
    }

}