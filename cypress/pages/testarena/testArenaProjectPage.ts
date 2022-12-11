export const testArenaProjectPage = {

    selectors: {
        cell: 'td',
        searchButton: '#j_searchButton'
    },

    searchProject: (name: string) => {
        cy.get('#search').type(name)
        cy.get(testArenaProjectPage.selectors.searchButton).click()
    },

    clickAddNewProject: () => {
        cy.get('a.button_link').eq(0).click()
    }

}