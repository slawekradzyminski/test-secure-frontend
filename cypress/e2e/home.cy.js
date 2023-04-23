import { getRandomUser } from "../utils/user"

describe('Home page', () => {
    // Dajemy to na poziomie całej test suity zeby mieć dostęp do tej zmiennej we wszystkich miejscach
    // tj. w beforeEachu i testach
    // Uzywamy leta i za kazdym razem nadpisujemy w beforeEachu zeby w kazdym teście mieć innego uzytkownika
    let user

    beforeEach(() => {
        user = getRandomUser()
        cy.register(user)
        cy.visit('http://localhost:8081')
        cy.get('[name=username]').type(user.username)
        cy.get('[name=password]').type(user.password)
        cy.get('.btn-primary').click()
    })

    it('should be able to edit user', () => {
        cy.get('li').contains(`${user.firstName}`).find('.edit').click()
    })

    it('should display at least one user', () => {
        cy.get('ul li').should('have.length.greaterThan', 1)
    })

    it('should logout', () => {
        cy.get('#logout').click()
        cy.url().should('contain', 'login')
    })

    it('should open add user page', () => {
        cy.get('#addmore').click()
        cy.url().should('contain', '/add-user')
    })

})
