/* eslint-disable no-undef */
const { createRandomString } = require('./helpers');
// to run cyprus run below script
// ./node_modules/.bin/cypress open
// new below
// DB_USERNAME=***@hotmail.com PASSWORD=**** npm run cy:open

// describe('my first test', () => {
//   it('Clicks an element', () => {
//     cy.visit('https://example.cypress.io');
//     cy.pause();
//     cy.contains('type').click();
//     // cy.url()
//     //   .should('include', '/commands/actions ');

//     // cy.get gets passed in a class name and finds an element based on a css class 
//     // .type to type text into selected input
//     cy.get('.action-email')
//       .type('fake@email.com')
//       .should('have.value', 'fake@email.com');

//     // Arrange - setup initial app state
//     // - visit a web page
//     // - query for an element

//     // Act - take an action
//     // - interact with that element

//     // Assert - make an assertion
//     // - make an assertion about page content 
//   });
// });

// To add env vars, run command to open cypress DB_USERNAME=****@hotmail.com PASSWORD=**** npm run cy:open
// ./cypress/plugins/index.js add   config.env.db = {
//   user: process.env.DB_USERNAME,
//   password: process.env.PASSWORD
// };
// const db = Cypress.env('db');
// then user is db.user etc

describe('tests login form', () => {
  it('fills in login form with valid details and gets correct text returned in swal pop up box', () => {
    // eslint-disable-next-line no-undef
    const db = Cypress.env('db');

    cy.visit('http://localhost:3001/');
    cy.get('[id="outlined-email"]').type(db.user);
    cy.get('[id="outlined-password"]').type(db.password);
    cy.get('#button').click();
    cy.get('.swal2-popup');
    cy.get('#swal2-html-container').then((message) => {
      const text = message.text(); // Now you have the text in the div
  
      // Do the assertion here
      expect(text).to.eq('You will now be redirected to the homepage');
    });
  });
  it('fills in login form with invalid details and gets correct text returned in swal pop up box', () => {
    cy.visit('http://localhost:3001/');
    cy.get('[id="outlined-email"]').type('dan@hotmail.com');
    cy.get('[id="outlined-password"]').type('password');
    cy.get('#button').click();
    cy.get('.swal2-popup');
    cy.get('#swal2-html-container').then((message) => {
      const text = message.text();
  
      expect(text).to.eq('[BadRequest] Invalid email or password');
    });
  });
});

describe('tests register form', () => {
  it('successfully registers a user', () => {
    cy.visit('http://localhost:3001/');
    cy.get('#register').click();

    cy.get('[id="email"]').type(createRandomString());
    cy.get('[id="password"]').type('test');
    cy.get('[id="firstName"]').type('cypress');
    cy.get('[id="lastName"]').type('Login');
    cy.get('#registerButton').click();

    cy.get('.swal2-popup');
    cy.get('#swal2-html-container').then((message) => {
      const text = message.text();
  
      expect(text).to.eq('Account created! You may now log in!');
    });
  });

  it('unsuccessfully registers a user', () => {
    const db = Cypress.env('db');
    cy.visit('http://localhost:3001/');
    cy.get('#register').click();

    cy.get('[id="email"]').type(db.user);
    cy.get('[id="password"]').type(db.password);
    cy.get('[id="firstName"]').type('cypress');
    cy.get('[id="lastName"]').type('Login');
    cy.get('#registerButton').click();

    cy.get('.swal2-popup');
    cy.get('#swal2-html-container').then((message) => {
      const text = message.text();
  
      expect(text).to.eq('[BadRequest] Error creating user');
    });
  });
});
