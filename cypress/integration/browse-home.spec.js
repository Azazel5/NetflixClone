/// <reference types="Cypress" />

describe('<Home /> -> <BrowseContent />', () => {
    beforeEach(() => {
        localStorage.setItem('profileSelected', true)
        cy.visit('/browse')
        cy.window()
            .its('store')
            .invoke('getState')
            .as('reduxState')

    })

    it('fetches trending, top-rated, and netflix originals successfully', () => {
        cy.get('@reduxState')
            .its('trending')
            .its('ids')
            .should('have.length', 20)

        cy.get('@reduxState')
            .its('toprated')
            .its('ids')
            .should('have.length', 20)

        cy.get('@reduxState')
            .its('netflixOriginals')
            .its('ids')
            .should('have.length', 20)
    })

    it('Ensure that the first video of trending section is placed on the <Video /> topTrailer', () => {
        cy.get('@reduxState')
            .its('trending')
            .its('ids')
            .then($idArray => {
                const firstElem = $idArray[0]
                cy.get('@reduxState')
                    .its('trending')
                    .its('entities')
                    .then(($entities => {
                        const item = Cypress._.find($entities, (element => element.id === firstElem))
                        cy.get('.VideoComponent')
                            .invoke('attr', 'style')
                            .then(style => {
                                expect(style).to.include(item.poster_path)
                            })
                    })) 
            })
    })
})