/// <reference types="Cypress" />

describe('<FAQComponent />', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('clicking all boxes still leaves the original number', () => {
        cy.get('.faqComponent')
            .click({ multiple: true })
            .should('have.length', 5)
    })

    it('has a set number of FAQ boxes if not clicked', () => {
        cy.get('.faqComponent')
            .should('have.length', 5)
    })

    it('Clicking on a box opens an inner box', () => {
        cy.get('.tv-inner > .faqComponent')
            .first()
            .click()
        
        cy.get('.faqComponent')
            .should('have.length', 6)
    })
})