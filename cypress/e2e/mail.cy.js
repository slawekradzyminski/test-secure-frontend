import { getRandomEmail } from "../utils/mail"
import { getRandomUser } from "../utils/user"

describe('Send email', () => {
    let user

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.visit('http://localhost:8081')
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()
    })

    it('sholud succssfully send email', () => {
        const email = getRandomEmail()
        cy.get('li').contains(`${user.firstName}`).find('.email').click()
        cy.get('[name=subject]').type(email.emailSubject)
        cy.get('[name=message]').type(email.emailMessage)
        cy.get('.btn-primary').click()
        cy.get('.alert-success').should('have.text', 'Email was scheduled to be send')
    })
})