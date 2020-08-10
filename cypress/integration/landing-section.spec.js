/// <reference types="Cypress" />

describe('<LandingSection />', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    context('<FAQComponent />', () => {
        it('leaves number of components intact even after pressing all boxes', () => {
            cy.get('.faqComponent')
                .click({ multiple: true })
                .should('have.length', 5)
        })

        it('has a set number of FAQ boxes if not clicked', () => {
            cy.get('.faqComponent')
                .should('have.length', 5)
        })

        it('opens an inner box on click', () => {
            cy.get('.tv-inner > .faqComponent')
                .first()
                .click()

            cy.get('.faqComponent')
                .should('have.length', 6)
        })
    })

    context('Sign In Button', () => {
        it("navigates to the login page on sign in button click", () => {
            cy.get('.Button')
                .contains('Sign In')
                .click()

            cy.location().should(loc => {
                expect(loc.pathname).to.eq('/login')
            })
        })
    })

})