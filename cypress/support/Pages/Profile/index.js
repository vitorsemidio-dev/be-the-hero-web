/** @format */

const el = require('./elements').ELEMENTS;

class Profile {
  clicarNoBotaoLogout() {
    cy.get(el.btnLogout).click();
  }

  clicarNoBotaoCadastrarNovoIncidente() {
    cy.get(el.btnNewIncident).click();
  }

  excluirIncidente() {
    cy.route('DELETE', '**/incidents/*').as('deleteIncident');

    cy.get(el.btnDeleteIncidente).click();
  }

  validarExclusaoIncidente() {
    cy.wait('@deleteIncident').then((xhr) => {
      expect(xhr.status).to.eq(204);
      expect(xhr.response.body).to.be.empty;
    });
  }
}

export default new Profile();
