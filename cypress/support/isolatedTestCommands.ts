import { User } from "../domain/User"
import { getLoginResponseFor } from "../domain/requests/loginTypes"
import { getRandomUser } from "../generators/userGenerator"
import { getAllUsersMocks } from "../mocks/getAllUsersMocks"

Cypress.Commands.add('isolatedLogin', () => {
    const user = getRandomUser()
    localStorage.setItem('user', JSON.stringify(getLoginResponseFor(user)))
    cy.setCookie('token', 'fakeToken')
    getAllUsersMocks.mockUsers()
})