/* eslint-disable no-undef */
/// <reference types="cypress" />

import axios from 'axios';

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
  it('shows pain level in time period graph on the page', () => {
    
    cy.get('#painLevelInTimePeriodGraph').should('exist');
    cy.get('#weeklyButton').should('exist');
    
    cy.get('#painLevelForTimePeriodTitle').should('exist')
      .then((message) => {
        const text = message.text();
        expect(text).to.eq('Weekly pain level');
      });
    cy.get('#monthlyButton').should('exist').click();
    cy.get('#painLevelForTimePeriodTitle').should('exist')
      .then((message) => {
        const text = message.text();
        expect(text).to.eq('Monthly pain level');
      });
  });
  it('shows average pain level per meal graph', () => {
    cy.get('#painLevelByMealTypeGraph').should('exist');
    cy.get('#averagePainLevelForMealTitle').should('exist')
      .then((message) => {
        const text = message.text();
        expect(text).to.eq('Average pain level per meal');
      });
  });
  it.only('shows statistic cards and shows correct value from api call', () => {
    const token = localStorage.getItem('userToken');
    cy.get('#mealsLoggedthisWeekCard').should('exist');

    cy.intercept({
      method: 'GET',
      url: 'http://localhost:1337/api/user/meals/amount/week',
    }).as('amountOfMealsApiCall');
    cy.wait('@amountOfMealsApiCall');
    cy.get('#amountOfMealsLoogedThisWeek').should('exist', { timeout: 30000 } )
      .then((message) => {
        const text = message.text();

        axios.get('http://localhost:1337/api/user/meals/amount/week', {
          headers: {
            authorization: `Bearer ${token}`,
          }
        }).then((res) => {
          const { data: { data } } = res;
          expect(data.toString()).to.equal(text);
        });
      });
      
    cy.get('#averagePainLevelthisWeekCard').should('exist');
    cy.get('#averagePainLevelthisWeek').should('exist', { timeout: 30000 })
      .then((message) => {
        const text = message.text();
        axios.get('http://localhost:1337/api/user/meals/pain/week', {
          headers: {
            authorization: `Bearer ${token}`,
          }
        }).then((res) => {
          const { data: { data: { painData } } } = res;
          const averageWeekPainLevel = Math.round((painData.reduce((a, b) => a + b, 0) / painData.length) * 100) / 100;
          expect(averageWeekPainLevel.toString()).to.equal(text);
        });
      });

    cy.get('#averagePainLevelthisMonthCard').should('exist');
    cy.get('#averagePainLevelthisMonth').should('exist', { timeout: 30000 })
      .then((message) => {
        const text = message.text();
        axios.get('http://localhost:1337/api/user/meals/pain/month', {
          headers: {
            authorization: `Bearer ${token}`,
          }
        }).then((res) => {
          const { data: { data: { painData } } } = res;
          const averageWeekPainLevel = Math.round((painData.reduce((a, b) => a + b, 0) / painData.length) * 100) / 100;
          expect(averageWeekPainLevel.toString()).to.equal(text);
        });
      });

    cy.get('#foodThatCausedTheMostPainCard').should('exist');
    cy.intercept({
      method: 'GET',
      url: 'http://localhost:1337/api/user/meals/worstPain',
    }).as('worstPainApiCall');
    cy.wait('@worstPainApiCall');
    cy.get('#foodThatCausedTheMostPain').should('exist')
      .then((message) => {
        const text = message.text();
        axios.get('http://localhost:1337/api/user/meals/worstPain', {
          headers: {
            authorization: `Bearer ${token}`,
          }
        }).then((res) => {
          const { data: { data: { mostCommonFoodWithHighPainLevel } } } = res;
          expect(mostCommonFoodWithHighPainLevel).to.equal(text);
        });
      });
  });
});
