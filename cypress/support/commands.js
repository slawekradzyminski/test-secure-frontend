Cypress.Commands.add('login', (username, password) => { 
    // 1 - Najpierw musimy wysłać request o logowanie
    // 2 - Jak przyjdzie odpowiedź to musimy ją ustawić w localStorage

    cy.request({
        method: 'POST',
        url: 'http://localhost:4001/users/signin', 
        body: {
          username: username,
          password: password,
        },
      }).then(resp => {
        expect(resp.status).to.eq(200)
        localStorage.setItem('user', JSON.stringify(resp.body))
      })
 })

//  Cypress.Commands.add('login', (username, password) => { 
//     cy.get('input[name=username]').type('admin')
//     cy.get('input[name=password]').type('admin')
//     cy.get('.btn-primary').click()
//  })