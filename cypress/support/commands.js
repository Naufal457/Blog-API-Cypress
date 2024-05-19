// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Comands.add('resetUsers', () => {
    cy.request('DELETE', '/auth/reset')
})


Cypress.Comands.add('badRequest', (response, messages = []) => {
    expect(response.status).to.eq(400)
    expect(response.body.error).to.eq('Bad Request')
    messages.foreEach((message) => {
        expect(message).to.be.oneOf(response.body.message)
    })
})