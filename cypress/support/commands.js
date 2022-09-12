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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/// <reference types="Cypress" />

const faker = require('faker-br')
import auth from '../fixtures/auth.json'

Cypress.Commands.add('navigate', (route) => {
    cy.intercept(route).as('loadpage')
    cy.visit(route, { timeout: 30000 })
    cy.wait('@loadpage')
})

Cypress.Commands.add("login", (email, password) => {
    cy.get('[data-test="login-email"] > .MuiInputBase-root > .MuiInputBase-input').type(email)
    cy.get('[data-test="login-password"] > .MuiInputBase-root > .MuiInputBase-input').type(password)
    cy.get('[data-test="login-submit"]').click()
})

Cypress.Commands.add("cadastrar", () => {
    Cypress.env('email', faker.internet.email())

    cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type('Angelica Silva')
    cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(Cypress.env('email'))
    cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('123456')
    cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('123456')
    cy.get('[data-test="register-submit"]').click()
})

Cypress.Commands.add("tokenJwt", () => {
    cy.request({
        method: 'POST',
        url: '/api/auth',
        body: auth
    }).then((response) => {
        return response.body.jwt
    })
})

Cypress.Commands.add("criarPostagem", (token, value) => {
    cy.request({
        method: 'POST',
        url: '/api/posts',
        headers: {
            Cookie: token
        },
        body: { "text": value }
    })
})

Cypress.Commands.add("criarPerfil", (token, company, status, location, website, skills, bio, githubusername, youtube, twitter, facebook, linkedin, instagram, medium) => {
    cy.request({
        method: 'POST',
        url: '/api/profile',
        headers: {
            Cookie: token
        },
        body: {
            "company": company,
            "status": status,
            "location": location,
            "website": website,
            "skills": skills,
            "bio": bio,
            "githubusername": githubusername,
            "youtube": youtube,
            "twitter": twitter,
            "facebook": facebook,
            "linkedin": linkedin,
            "instagram": instagram,
            "medium": medium
        }
    })
})

Cypress.Commands.add("deletarUsuario", (token) => {
    cy.request({
        method: 'DELETE',
        url: '/api/profile',
        headers: {
            Cookie: token
        }
    })
})

Cypress.Commands.add("criarUsuario", () => {
    cy.request({
        method: 'POST',
        url: '/api/users',
        body: {

            "name": "Angelica",
            "email": auth.email,
            "password": auth.password
        }
    })
})