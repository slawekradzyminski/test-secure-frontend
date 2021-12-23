import LoginPage from "../pages/LoginPage"

describe('login page', () => {

    const loginPage = new LoginPage()

    beforeEach(() => {
        cy.visit('http://localhost:8080')
    })

    it('displays two todo items by default', () => {
        loginPage.login('admin', 'admin')

        cy.get('ul li').each(($row) => {
            if (!$row.text().includes('Slawomir Radzyminski')) {
              cy.wrap($row).find('.delete').click()
            } 
          })
    })

})
