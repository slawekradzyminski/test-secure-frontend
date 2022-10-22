Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signin',
        body: {
            username: username,
            password: password
        }
    }).then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.body))
        return resp.body.token
    })

})

// cy.request()
//  .then(resp => localStorage.setItem)
//  tu mamy dopisanego returna
//  .then(resp => cy.setCookie())
//  .then(() => cy visit))
//  .then(() => cy.get(li))

Cypress.Commands.add('register', (user) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signup',
        body: user
    })

})
