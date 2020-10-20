/** @format */

/// <reference types="cypress" />

import Logon from '../support/Pages/Logon';
import NewIncident from '../support/Pages/NewIncident';
import Register from '../support/Pages/Register';
import Profile from '../support/Pages/Profile';

describe('Ongs', () => {
  it('Deve poder realizar cadastro', () => {
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

    Profile.clicarNoBotaoLogout();
  });

  it('devem poder cadastrar novos casos', () => {
    cy.login();
    NewIncident.acessarNovoIncidente();
    NewIncident.preencherCadastro();
    NewIncident.validarCadastroDeIncidenteComSucesso();
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
