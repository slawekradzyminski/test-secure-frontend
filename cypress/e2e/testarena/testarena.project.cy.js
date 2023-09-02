import { generateRandomString } from "../../utils/random";

describe("Test Arena my new Project", () => {
    beforeEach(() => {
      cy.visit("http://demo.testarena.pl/zaloguj");
      cy.loginToTestArena("administrator@testarena.pl", "sumXQQ72$L");
    });

    it('should successfully add new project', () => {
        const randomName = generateRandomString(20)
        const randomPrefix = generateRandomString(4)
        cy.get('.icon_tools').click()
        cy.get('.button_link').contains('Dodaj projekt').click()
        cy.get('#name').type(randomName)
        cy.get('#prefix').type(randomPrefix)
        cy.get('#save').click()
        cy.get('.content_label_title').should('have.text', randomName)
    });
  });
  