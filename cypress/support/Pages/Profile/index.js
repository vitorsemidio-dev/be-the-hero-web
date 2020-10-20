/** @format */

const el = require('./elements').ELEMENTS;

class Profile {
  clicarNoBotaoLogout() {
    cy.get(el.btnLogout).click();
  }

  clicarNoBotaoCadastrarNovoIncidente() {
    cy.get(el.btnNewIncident).click();
  }
}

export default new Profile();
