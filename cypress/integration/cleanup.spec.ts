import LoginPage from "../pages/LoginPage"

describe('login page', () => {

    const loginPage = new LoginPage()

    beforeEach(() => {
        cy.visit('/')
    })

    it('C2123 User cleanup', () => {
        loginPage.login('admin', 'admin')

        cy.get('ul li').each(($row) => {
            if (!$row.text().includes('Slawomir Radzyminski')) {
              cy.wrap($row).find('.delete').click()
            } 
          })
    })

})
