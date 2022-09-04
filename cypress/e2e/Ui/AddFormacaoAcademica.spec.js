/// <reference types="cypress" />
const formacaoAcademicaPage = require('../../support/FormacaoAcademica/formacaoAcademicaPage')

describe('Funcionalidade: Adicionar experiência', () => {
    beforeEach(() => {
        cy.visit('login')
        cy.fixture("usuarios").then((user) => {
            cy.login(user[0].email, user[0].senha)
        })
        cy.visit('adicionar-formacao')
    });
    it('Deve adicionar uma formacação com sucesso', () => {
        cy.fixture("formacaoAcademica").then((res) => {
            formacaoAcademicaPage.addFormacao(res[0].escola, res[0].grau, res[0].curso, res[0].dataInicio, res[0].dataFim, res[0].descricao)
            cy.get('[data-test="education-delete"]').should('exist')
        })
    });

    it('Deve adicionar uma formacao atual com sucesso', () => {
        cy.fixture("formacaoAcademica").then((res) => {
            formacaoAcademicaPage.addFormacaoAtual(res[1].escola, res[1].grau, res[1].curso, res[1].dataInicio, res[1].descricao)
            cy.get('[data-test="education-delete"]').should('exist')
        })
    });

    it('Deve excluir uma formacao com sucesso', () => {
        formacaoAcademicaPage.addFormacaoAtual('fatec', 'superior', 'programação', '01/01/2002', 'lalalal')
        cy.get('[data-test="education-delete"]').first().click()
        cy.contains('Formação Acadêmica Removida').should('exist')
    });
});