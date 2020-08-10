/// <reference types="Cypress" />

describe('<Browse />', () => {
    beforeEach(() => {
        cy.validLogin()
    })

    it('opens browse section if local storage profile selection is set', () => {
        localStorage.setItem('profileSelected', true)

        cy.get('.Button')
            .contains('Sign In')
            .click()

        cy.get('.BrowseContent')
            .should('exist')
    })

    it('opens modal if local storage is not set, and continues to browse section', () => {
        cy.clearLocalStorage()
        
        cy.get('.Button')
            .contains('Sign In')
            .click()

        cy.get('.BrowseContent')
            .should('not.exist')

        cy.get('.ProfileDiv')
            .should('exist')
            .find('.ProfileCard')
            .as('profileCard')
            .should('have.length', 4)

        cy.get('@profileCard')
            .first()
            .click()
            .should(($profileCard) => {
                expect(localStorage.getItem('profileSelected')).to.exist
                expect($profileCard).to.not.exist
            })

        cy.get('.BrowseContent')
            .should('exist')
    })
})