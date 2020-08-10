/// <reference types="Cypress" />

describe('<Login />', () => {
    beforeEach(() => {
        cy.visit('/login')

        cy.get('input[name="email"]')
            .as('inputEmail')

        cy.get('input[name="password"]')
            .as('passwordInput')
    })

    it('fails to submit form without any input and shows error spans for both inputs', () => {
        cy.get('.Button')
            .contains('Sign In')
            .click()

        cy.location().should(loc => {
            expect(loc.pathname).to.eq('/login')
        })

        cy.get('form')
            .children('span')
            .should('have.length', 2)
    })

    it('shows a span text on email input focus and focus lost', () => {
        const spanText = 'Please enter a valid email or phone number.'
        cy.get('@inputEmail')
            .focus()
            .blur()

        cy.get('form')
            .children('span')
            .should('have.length', 1)
            .contains(spanText)
    })

    it('changes span text on password validation passed', () => {
        const spanText = 'Your password must contain between 4 and 60 characters.'
        cy.get('@passwordInput')
            .focus()
            .blur()

        cy.get('form')
            .children('span')
            .as('text')

        cy.get('@text')
            .should('have.length', 1)
            .contains(spanText)

        cy.get('@passwordInput')
            .type('123')

        cy.get('@text')
            .contains(spanText)

        cy.get('@passwordInput')
            .type('4')

        cy.get('@text')
            .should('not.exist')
    })

    it('logs in on valid input', () => {
        cy.get('@inputEmail')
            .type('example@example.com')

        cy.get('@passwordInput')
            .type('1234')

        cy.get('.Button')
            .contains('Sign In')
            .click()

        cy.location().should(loc => {
            expect(loc.pathname).to.eq('/browse')
        })
    })
})