Cypress.Commands.add('validLogin', () => {
    cy.visit('/login')

    cy.get('input[name="email"]')
        .type('example@example.com')

    cy.get('input[name="password"]')
        .type('1234')
})