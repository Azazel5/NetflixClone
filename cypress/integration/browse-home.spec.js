/// <reference types="Cypress" />

describe('<Home /> -> <BrowseContent />', () => {
    beforeEach(() => {
        localStorage.setItem('profileSelected', true)
        cy.visit('/browse')
    })

    it.only('fetches trending, top-rated, and netflix originals successfully', () => {

    })
})