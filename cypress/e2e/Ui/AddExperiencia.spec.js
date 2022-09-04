/// <reference types="cypress" />
const experienciaPage = require('../../support/Experiencia/experienciaPage')

describe('Funcionalidade: Adicionar experiência', () => {
    beforeEach(() => {
        cy.visit('login')
        cy.fixture("usuarios").then((user) => {
            cy.login(user[0].email, user[0].senha)
        })
        cy.visit('adicionar-experiencia')
    });
    it('Deve adicionar uma experiência com sucesso', () => {
        experienciaPage.addExperiencia('qa', 'fc', 'sp', '01/01/2002', '01/01/2003', 'lalalal')
        cy.get('[data-test="experience-delete"]').should('exist')
    });

    it('Deve adicionar uma experiência atual com sucesso', () => {
        experienciaPage.addExperienciaAtual('qa', 'fc', 'sp', '01/01/2002', 'lalalal')
        cy.get('[data-test="experience-delete"]').should('exist')
    });

    it('Deve excluir uma experiência com sucesso', () => {
        experienciaPage.addExperiencia('qa', 'fc', 'sp', '01/01/2002', '01/01/2003', 'lalalal')
        cy.get('[data-test="experience-delete"]').first().click()
        cy.contains('Experiência Removida').should('exist')
    });
});