/// <reference types="cypress" />

const faker = require('faker-br')

describe('Testes de Criação de Perfil', () => {
    let token

    beforeEach(() => {
        cy.criarUsuario()
        cy.tokenJwt().then((auth) => {
            token = auth
        })
    });

    afterEach(() => {
        cy.deletarUsuario(token)
    });
    it('[POST] Criar um perfil', () => {
        cy.request({
            method: "POST",
            url: "/api/profile",
            headers: {
                Cookie: token
            },
            body: {
                "company": faker.company.companyName(),
                "status": "Estudando ou Aprendendo",
                "location": "sp",
                "website": "https://conexaoqa.herokuapp.com/",
                "skills": "testes",
                "bio": "lalalalalala",
                "githubusername": "https://conexaoqa.herokuapp.com/",
                "youtube": "https://conexaoqa.herokuapp.com/string",
                "twitter": "https://conexaoqa.herokuapp.com/",
                "facebook": "https://conexaoqa.herokuapp.com/",
                "linkedin": "https://conexaoqa.herokuapp.com/",
                "instagram": "https://conexaoqa.herokuapp.com/",
                "medium": "https://conexaoqa.herokuapp.com/"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    });
});

describe('Testes de consulta', () => {
    let token
    let user

    beforeEach(() => {
        cy.criarUsuario()
        cy.tokenJwt().then((auth) => {
            token = auth
        })
        cy.criarPerfil(token, faker.company.companyName(), "Estudando ou Aprendendo", "sp", "https://conexaoqa.herokuapp.com/", "testes", "lalalal", "https://conexaoqa.herokuapp.com/", "https://conexaoqa.herokuapp.com/", "https://conexaoqa.herokuapp.com/", "https://conexaoqa.herokuapp.com/", "https://conexaoqa.herokuapp.com/", "https://conexaoqa.herokuapp.com/", "https://conexaoqa.herokuapp.com/").then((response) => {
            user = response.body.user
        })
    });

    afterEach(() => {
        cy.deletarUsuario()
    });
    it('[GET] Consultar um perfil', () => {
        cy.request({
            method: "GET",
            url: "/api/profile/me",
            headers: {
                Cookie: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    });

    it('[GET] Consulta por id', () => {
        cy.request({
            method: 'GET',
            url: `/api/profile/user/${user}`,
            headers: {
                Cookie: token
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    });
});

describe('Testes de exclusão', () => {
    let token
    beforeEach(() => {
        cy.criarUsuario()
        cy.tokenJwt().then((auth) => {
            token = auth
        })
        cy.criarPerfil(token, faker.company.companyName(), "Estudando ou Aprendendo", "sp", "https://conexaoqa.herokuapp.com/", "testes", "lalalal", "https://conexaoqa.herokuapp.com/", "https://conexaoqa.herokuapp.com/", "https://conexaoqa.herokuapp.com/", "https://conexaoqa.herokuapp.com/", "https://conexaoqa.herokuapp.com/", "https://conexaoqa.herokuapp.com/", "https://conexaoqa.herokuapp.com/").then((response) => {
        })
    });
    it('[DELETE] Excluir um perfil', () => {
        cy.deletarUsuario(token).then((response) => {
            expect(response.body.msg).to.eq("Usuário removido")
        })
    });
});