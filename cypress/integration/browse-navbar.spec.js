/// <reference types="Cypress" />

describe('<Search /> and <Dropdown />', () => {
    beforeEach(() => {
        localStorage.setItem('profileSelected', true)
        cy.visit('/browse')
    })

    context('<Dropdown />', () => {
        beforeEach(() => {
            cy.get('.OptionsContainer .Dropdown > svg')
                .as('dropbox')
        })

        it('finds floating box on hover and fails to find it on hover off', () => {
            cy.get('@dropbox')
                .trigger('mouseover')
                .then(() => {
                    cy.get('.FloatingBox')
                        .should('exist')
                })
                .trigger('mouseleave', 'bottom')
                .then(() => {
                    cy.get('FloatingBox')
                        .should('not.exist')
                })
        })

        it('logs out and removes the local storage token on sign out press', () => {
            cy.get('@dropbox')
                .trigger('mouseover')
                .get('.FloatingBox')
                .find('span')
                .contains('Sign out of Netflix')
                .click()
                .then(() => {
                    expect(localStorage.getItem('profileSelected')).to.not.exist
                    cy.location().should(loc => {
                        expect(loc.pathname).to.eq('/')
                    })
                })
        })
    })
})