/** @format */

class Logon {
  acessarLogin() {
    cy.visit('http://localhost:3000/');
  }

  preencherLogin() {
    cy.get('[data-cy=input-login]').type(Cypress.env('createdOngId'));
    cy.get('[data-cy=btn-login]').click();
  }
}

export default new Logon();
