/* eslint-disable no-undef */
describe('tests navbar', () => {
  it('has a navbar with correct elements/links', () => {
    const db = Cypress.env('db');

    cy.visit('http://localhost:3001/');
    cy.get('[id="outlined-email"]').type(db.user);
    cy.get('[id="outlined-password"]').type(db.password);
    cy.get('#button').click();
    cy.get('.swal2-popup');
    cy.get('#swal2-html-container');
    cy.get('.swal2-actions').click();
    cy.get('#appBar').should('exist');
    cy.get('#title').should('exist');
    cy.get('#profileButton').should('exist');
    cy.get('#logoutButton').should('exist');
     
  });
  it('logs out user correctly', () => {
    const db = Cypress.env('db');
    cy.visit('http://localhost:3001/');
    cy.get('[id="outlined-email"]').type(db.user);
    cy.get('[id="outlined-password"]').type(db.password);
    cy.get('#button').click();
    cy.get('.swal2-popup');
    cy.get('#swal2-html-container');
    cy.get('.swal2-actions').click()
      .then(() => {
        const test = localStorage.getItem('userToken');
        expect([test]).to.have.length(1);
        cy.log([test][0]);
        cy.get('#logoutButton').click()
          .then(() => {
            const test = localStorage.getItem('userToken');
            expect(test).to.eq(null);
          });
      });
  });
});
