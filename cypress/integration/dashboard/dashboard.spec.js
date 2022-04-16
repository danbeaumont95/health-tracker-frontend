/* eslint-disable no-undef */
/// <reference types="cypress" />

describe('tests dashboard page', () => {
  beforeEach(() => {
    const db = Cypress.env('db');

    cy.visit('http://localhost:3000');
    cy.get('[id="outlined-email"]').type(db.user);
    cy.get('[id="outlined-password"]').type(db.password);
    cy.get('#button').click();
    cy.get('#swal2-html-container').then((message) => {
      const text = message.text();
  
      expect(text).to.eq('You will now be redirected to the homepage');
    });
    cy.visit('http://localhost:3000/dashboard');
    cy.saveLocalStorage();
  });
  it('shows graph on the page', () => {
    
    cy.get('#painLevelInTimePeriodGraph').should('exist');
    cy.get('#weeklyButton').should('exist');
    
    cy.get('#graphTitle').should('exist')
      .then((message) => {
        const text = message.text();
        expect(text).to.eq('Weekly pain level');
      });
    cy.get('#monthlyButton').should('exist').click();
    cy.get('#graphTitle').should('exist')
      .then((message) => {
        const text = message.text();
        expect(text).to.eq('Monthly pain level');
      });
  });
});
