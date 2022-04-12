/* eslint-disable no-undef */

describe('tests profile page', () => {

  
  it('has a title', () => {
    const db = Cypress.env('db');

    cy.visit('http://localhost:3001/');
    cy.get('[id="outlined-email"]').type(db.user);
    cy.get('[id="outlined-password"]').type(db.password);
    cy.get('#button').click();
    cy.get('.swal2-popup');
    cy.get('#swal2-html-container').then((message) => {
      const text = message.text();
  
      expect(text).to.eq('You will now be redirected to the homepage');
    });
    cy.visit('http://localhost:3001/profile');
    cy.get('#title').then((res) => {
      const text = res.text();
      expect(text).to.eq('Account Settings');
    });

  });
  it('gets correct user details stored in text field', () => {
    const db = Cypress.env('db');

    cy.visit('http://localhost:3001/');
    cy.get('[id="outlined-email"]').type(db.user);
    cy.get('[id="outlined-password"]').type(db.password);
    cy.get('#button').click();
    cy.get('.swal2-popup');
    cy.get('#swal2-html-container').then((message) => {
      const text = message.text();
  
      expect(text).to.eq('You will now be redirected to the homepage');
    });
    cy.visit('http://localhost:3001/profile');
    cy.log(db.userId);

    cy.request(`http://localhost:1337/api/user/${db.userId}`).then((res) => {
      cy.log(res.body.data.firstName, 'RES BODY');
      const { body: { data: { firstName, lastName, email, phoneNumber } } } = res;
      cy.get('input[id="firstName"]')
        .invoke('val')
        .then((userFirstName) => {
          expect(userFirstName).to.eq(firstName);
        });
      cy.get('input[id="lastName"]')
        .invoke('val')
        .then((userLastName) => {
          expect(userLastName).to.eq(lastName);
        });
      cy.get('input[id="email"]')
        .invoke('val')
        .then((userEmail) => {
          expect(userEmail).to.eq(email);
        });
      cy.get('input[id="phoneNumber"]')
        .invoke('val')
        .then((userPhone) => {
          expect(userPhone).to.eq(phoneNumber);
        });
    });
  });
  it('updates user details successfully', () => {
    const db = Cypress.env('db');

    cy.visit('http://localhost:3001/');
    cy.get('[id="outlined-email"]').type(db.user);
    cy.get('[id="outlined-password"]').type(db.password);
    cy.get('#button').click();
    cy.get('.swal2-popup');
    cy.get('#swal2-html-container').then((message) => {
      const text = message.text();
  
      expect(text).to.eq('You will now be redirected to the homepage');
    });
    cy.visit('http://localhost:3001/profile');
    cy.get('input[id="firstName"]').type('s');
    cy.get('input[id="lastName"]').type('s');
    cy.get('input[id="email"]').type('s');
    cy.get('input[id="phoneNumber"]').type('1');
    cy.get('#submitUserDetailsButton').click();
    cy.get('#swal2-html-container').then((message) => {
      const text = message.text();
  
      expect(text).to.eq('Details successfully updated!');
    });
  });
});
