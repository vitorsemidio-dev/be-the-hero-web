/** @format */

/// <reference types="cypress" />

import Logon from '../support/Pages/Logon';
import Register from '../support/Pages/Register';

describe('Ongs', () => {
  it.only('Deve poder realizar cadastro', () => {
    Register.acessarCadastro();
    Register.preencherCadastro();
    Register.validarCadastroDeOngsComSucesso();
  });

  it('Deve poder realizar login', () => {
    Logon.acessarLogin();
    Logon.preencherLogin();
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
