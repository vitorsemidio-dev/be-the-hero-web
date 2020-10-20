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
      expect(xhr.response.body).has.property('id');
      expect(xhr.response.body.id).is.not.null;
    });
  });

  it('Deve poder realizar login', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-cy=input-login]').type(Cypress.env('createdOngId'));
    cy.get('[data-cy=btn-login]').click();
  });

  it('devem poder fazer logout', () => {
    cy.login();

    cy.get('[data-cy=btn-logout]').click();
  });

  it('devem poder cadastrar novos casos', () => {
    cy.login();

    cy.get('[data-cy=new-incident]').click();

    cy.get('[data-cy=incident-title]').type('Animal abandonado');
    cy.get('[data-cy=incident-description]').type(
      'Animal precisa de apoio para ter onde morar',
    );
    cy.get('[data-cy=incident-value]').type(200);

    cy.route('POST', '**/incidents').as('newIncident');

    cy.get('[data-cy=btn-incident]').click();

    cy.wait('@newIncident').then((xhr) => {
      expect(xhr.status).to.eq(200);
      expect(xhr.response.body).has.property('id');
      expect(xhr.response.body.id).is.not.null;
    });
  });

  it('devem poder excluir um caso', () => {
    cy.createNewIncident();
    cy.login();

    cy.route('DELETE', '**/incidents/*').as('deleteIncident');

    cy.get('[data-cy=btn-delete]').click();

    cy.wait('@deleteIncident').then((xhr) => {
      expect(xhr.status).to.eq(204);
      expect(xhr.response.body).to.be.empty;
    });
  });
});
