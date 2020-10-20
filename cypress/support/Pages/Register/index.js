/** @format */

const el = require('./elements').ELEMENTS;

class Register {
  acessarCadastro() {
    cy.visit('http://localhost:3000/register');
  }

  preencherCadastro() {
    cy.get(el.inputName).type('Dogs queridos');
    cy.get(el.inputEmail).type('dogs@email.com');
    cy.get(el.inputWhatsapp).type('21999999999');
    cy.get(el.inputCity).type('Rio de Janeiro');
    cy.get(el.inputUf).type('RJ');

    cy.server();
    cy.route('POST', '**/ongs').as('postOng');

    cy.get(el.btnSubmit).click();
  }

  validarCadastroDeOngsComSucesso() {
    cy.wait('@postOng').then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property('id');
      expect(xhr.response.body.id).is.not.null;
    });
  }
}

export default new Register();
