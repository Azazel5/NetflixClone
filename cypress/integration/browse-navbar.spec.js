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

    context('<Search />', () => {
        beforeEach(() => {
            cy.get('.SearchBox')
                .click()
        })
        it('opens search box on click and closes on background click', () => {
            cy.get('.Holder')
                .should('exist')

            cy.get('.NavBar')
                .click('center')
                .find('.Holder')
                .should('not.exist')
        })

        it('cross becomes visible after typing and invisible when input length is 0', () => {
            cy.get('.Holder')
                .children('input')
                .type('Some movie title')

            cy.get('.Holder')
                .children('svg')
                .last()
                .click()
                .should('not.exist')
        })
    })
})