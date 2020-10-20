/** @format */

const el = require('./elements').ELEMENTS;

class Profile {
  clicarNoBotaoLogout() {
    cy.get(el.btnLogout).click();
  }
}

export default new Profile();
