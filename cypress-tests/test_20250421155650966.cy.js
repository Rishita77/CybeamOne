describe('Auto-Generated Cypress Test', () => {
  it('Replays user session', () => {
    cy.visit('https://docs.google.com/forms/d/e/1FAIpQLSfImv5MrBcmICepZRjGk7ydY34ep4o63EXU8VnXd1CafAw6QA/viewform');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Intercept and wait for network request to /forms/d/e/1FAIpQLSfImv5MrBcmICepZRjGk7ydY34ep4o63EXU8VnXd1CafAw6QA/font/getmetadata?resourcekey=0-ZjFNIaLtY9l_GUuzY9g7-A
    cy.intercept('/forms/d/e/1FAIpQLSfImv5MrBcmICepZRjGk7ydY34ep4o63EXU8VnXd1CafAw6QA/font/getmetadata?resourcekey=0-ZjFNIaLtY9l_GUuzY9g7-A').as('request39');
    cy.wait('@request39').its('response.statusCode').should('eq', 200);
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Intercept and wait for network request to /forms/d/e/1FAIpQLSfImv5MrBcmICepZRjGk7ydY34ep4o63EXU8VnXd1CafAw6QA/naLogImpressions?resourcekey=0-ZjFNIaLtY9l_GUuzY9g7-A
    cy.intercept('/forms/d/e/1FAIpQLSfImv5MrBcmICepZRjGk7ydY34ep4o63EXU8VnXd1CafAw6QA/naLogImpressions?resourcekey=0-ZjFNIaLtY9l_GUuzY9g7-A').as('request51');
    cy.wait('@request51').its('response.statusCode').should('eq', 200);
    // Intercept and wait for network request to https://play.google.com/log?format=json&hasfast=true&authuser=0
    cy.intercept('https://play.google.com/log?format=json&hasfast=true&authuser=0').as('request53');
    cy.wait('@request53').its('response.statusCode').should('eq', 200);
    // Intercept and wait for network request to /forms/d/e/1FAIpQLSfImv5MrBcmICepZRjGk7ydY34ep4o63EXU8VnXd1CafAw6QA/font/getmetadata?resourcekey=0-ZjFNIaLtY9l_GUuzY9g7-A
    cy.intercept('/forms/d/e/1FAIpQLSfImv5MrBcmICepZRjGk7ydY34ep4o63EXU8VnXd1CafAw6QA/font/getmetadata?resourcekey=0-ZjFNIaLtY9l_GUuzY9g7-A').as('request54');
    cy.wait('@request54').its('response.statusCode').should('eq', 200);
  });
});