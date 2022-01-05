/// <reference types="cypress" />

/// <reference types="cypress" />

describe("Cleanup test", () => {

  beforeEach(() => {
    cy.login('admin', 'admin')
    cy.visit('')
  })

  it('should delete all users except admin', () => {
    cy.get('ul li').each($row => {
        if (!$row.text().includes('Slawomir Radzyminski')) {
            cy.wrap($row).find('.delete').click()
        }
    })
  });
})
