/** @format */

/// <reference types="cypress" />

describe('Ongs', () => {
  it.skip('Deve poder realizar cadastro', () => {
    // Visitar página
    cy.visit('http://localhost:3000/register');

    // Seleção e preenchimento dos campos
    cy.get('[data-cy=name]').type('Dogs queridos');
    cy.get('[data-cy=email]').type('dogs@email.com');
    cy.get('[data-cy=whatsapp]').type('21999999999');
    cy.get('[data-cy=city]').type('Rio de Janeiro');
    cy.get('[data-cy=uf]').type('RJ');

    // Servidor
    cy.server();
    cy.route('POST', '**/ongs').as('postOng');

    // Seleção botão submit e clique
    cy.get('[data-cy=submit]').click();

    cy.wait('@postOng').then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property('id');
      expect(xhr.response.body.id).is.not.null;
    });
  });

  it.skip('Deve poder realizar login', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input').type(Cypress.env('createdOngId'));
    cy.get('.button').click();
  });

  it('devem poder fazer logout', () => {
    cy.visit('http://localhost:3000/');
    cy.get('input').type(Cypress.env('createdOngId'));
    cy.get('[data-cy=btn-login]').click();

    cy.get('[data-cy=btn-logout]').click();
  });
});
