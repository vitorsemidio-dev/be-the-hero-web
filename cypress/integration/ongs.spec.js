/** @format */

/// <reference types="cypress" />

describe('Ongs', () => {
  it('Deve poder realizar cadastro', () => {
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
    });
  });

  it('Deve poder realizar login', () => {
    //
  });
});
