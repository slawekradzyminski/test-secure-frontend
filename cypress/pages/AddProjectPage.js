export default class AddProjectPage {

    static getTitle = () => cy.get('h1.content_title')
    
    static addNewProject = (projectName) => {
        cy.get('#name').type(projectName)
        cy.get('#prefix').type(projectName)
        cy.get('#save').click()
    }

}