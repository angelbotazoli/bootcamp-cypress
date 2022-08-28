/// <reference types="cypress" />

const faker = require('faker-br')

describe('US001 - Funcionalidade: Cadastro', () => {
    /*
    antes de tudo
    before

    antes de cada cenário
    beforeEach

    depois de tudo
    after

    depois de cada cenário
    afterEach
    */

    beforeEach(() => {
        cy.visit('cadastrar')
    });

    it('Deve fazer cadastro com sucesso', () => {
        cy.get('[data-test="register-name"] > .MuiInputBase-root > .MuiInputBase-input').type('Angelica Silva')
        cy.get('[data-test="register-email"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.email())
        cy.get('[data-test="register-password"] > .MuiInputBase-root > .MuiInputBase-input').type('123456')
        cy.get('[data-test="register-password2"] > .MuiInputBase-root > .MuiInputBase-input').type('123456')
        cy.get('[data-test="register-submit"]').click()

        //Resultado esperado
        cy.get('.large').should('contain', 'Dashboard')
        cy.get('[data-test="dashboard-createProfile"]').should('exist')
    });
});