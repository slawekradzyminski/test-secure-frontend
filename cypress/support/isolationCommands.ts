Cypress.Commands.add('prepareLocalStorageAndSetCookie', user => {
    const fakeToken = 'fakeToken'
    const fakeLoginResponse = {
        ...user,
        token: fakeToken
    }
    localStorage.setItem('user', JSON.stringify(fakeLoginResponse))
    cy.setCookie('token', fakeToken)
})