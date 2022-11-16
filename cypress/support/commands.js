Cypress.Commands.add('login', (email, password) => { 
    cy.request('http://demo.testarena.pl/zaloguj')
      .its('body')
      .then((body) => {
        const $html = Cypress.$(body)
        const csrf = $html.find('#csrf').val()

        cy.request({
          method: 'POST',
          url: 'http://demo.testarena.pl/logowanie',
          form: true,
          body: {
            email: email,
            password: password,
            login: 'Zaloguj',
            remember: 0,
            csrf: csrf
          },
        })
          .then((resp) => {
            expect(resp.status).to.eq(200)
          })
      })
 })
