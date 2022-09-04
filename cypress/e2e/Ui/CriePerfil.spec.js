/// <reference types="cypress" />

const faker = require('faker-br')

describe('', () => {
    before(() => {
        cy.visit('cadastrar')
        cy.cadastrar()
    });

    after(() => {
        cy.get('[data-test="dashboard-deleteProfile"]').click()
        cy.get('.alert-undefined').should('contain', "Sua conta foi removida")
    });

    it('', () => {
        cy.get('[data-test="dashboard-createProfile"]').click()
        cy.get('#mui-component-select-status').click()
        cy.get('.MuiList-root.MuiMenu-list.MuiList-padding').children().first().click()
        cy.get('[data-test="profile-company"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.company.companyName())
        cy.get('[data-test="profile-webSite"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.url())
        cy.get('[data-test="profile-location"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.address.city())
        cy.get('[data-test="profile-skills"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.lorem.words())
        cy.get('[data-test="profile-gitHub"] > .MuiInputBase-root > .MuiInputBase-input').type(faker.internet.userName())
        cy.get('[rows="1"]').type(faker.lorem.paragraph())
        cy.get('[data-test="profile-submit"]').click()
        cy.get('[data-test="alert"]').should('contain', "Perfil Criado")
        cy.get('[data-test="dashboard-welcome"]').should('contain', "Angelica Silva")
    });
});