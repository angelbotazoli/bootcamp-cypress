/// <reference types="cypress" />

// import mockPerfil from "../../fixtures/profile.json"

describe('Funcionalidade: Visualização dos perfis', () => {
    beforeEach(() => {
        cy.visit('perfis')
        //intecerpt estilo mock é diferente de espera implicita com wait
        cy.intercept({
            method: "GET",
            url: "api/profile"
        }, {
            statusCode: 200,
            // body: mockPerfil,
            fixture: "profile"
        })
        cy.reload()
    });
    it('Validar o primeiro item da lista', () => {
        cy.get('[data-test="profile-name"]').first().should('contain', 'Angelica Guerra')
    });

    it('Validar lista vazia', () => {
        cy.intercept('api/profile', { statusCode: 404 })
        cy.reload()
        cy.get('[data-test="profiles-noProfiles"]').should('contain', 'Nenhum perfil encontrado')
    });

    it('Validar o ultimo item da lista', () => {
        cy.get('[data-test="profile-name"]').last().should('contain', 'Wedney Santos Silva')
    });

    it('Validar o terceiro item da lista', () => {
        cy.get('[data-test="profile-name"]').eq(2).should('contain', 'Thaís da Silva')
    });
});