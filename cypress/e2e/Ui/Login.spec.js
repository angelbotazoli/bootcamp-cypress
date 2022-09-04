/// <reference types="cypress" />

import usuarios from '../../fixtures/usuarios.json'

describe('US001 - Funcionalidade: Login', () => {
    beforeEach(() => {
        cy.visit('login')
    });

    it('Deve fazer login com sucesso', () => {
        cy.login('angelica@teste.com.br', '123456')
        cy.get('[data-test="dashboard-welcome"]').should('contain', 'Angelica')
    });

    it('Validar mensagem de erro quando inserir usuário ou senha inválidos', () => {
        cy.login('aangelica@teste.com.br', '123456')
        cy.get('[data-test="alert"]').should('contain', 'Credenciais inválidas')
    });

    it('Deve fazer login com sucesso - Usando importação', () => {
        cy.login(usuarios[1].email, usuarios[1].senha)
        cy.title().should('eq', 'ConexaoQA')
    });

    it('Deve fazer login com sucesso - Usando fixture', () => {
        cy.fixture("usuarios").then((user) => {
            cy.login(user[0].email, user[0].senha)
        })
        cy.title().should('eq', 'ConexaoQA')
    });
});

/*
Funcionalidade: Login
Eu como usuário das Conexão QA
Quero fazer o login
Para editar meu perfil

Cenário: Login com sucesso
Arrange - Dado - Pré-requisito -> Dado que eu esteja na tela de login
Action - Quando - Ação do usuário - Quando eu inserir usuário e senha
Assert - Então - Resultado esperado - Então deve me direcionar para o Dashboard

Cenário: Validar msg de erro

Cenário: Recuperar senha
*/