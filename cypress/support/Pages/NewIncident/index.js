/** @format */

const el = require('./elements').ELEMENTS;

class NewIncident {
  preencherCadastro() {
    cy.get(el.inputTitleIncident).type('Animal abandonado');
    cy.get(el.inputDescriptionIncident).type(
      'Animal precisa de apoio para ter onde morar',
    );
    cy.get(el.inputDescriptionValue).type(200);

    cy.route('POST', '**/incidents').as('newIncident');

    cy.get(el.btnSubmitIncident).click();
  }

  validarCadastroDeIncidenteComSucesso() {
    cy.wait('@newIncident').then((xhr) => {
      expect(xhr.status).to.eq(200);
      expect(xhr.response.body).has.property('id');
      expect(xhr.response.body.id).is.not.null;
    });
  }
}

export default new NewIncident();
