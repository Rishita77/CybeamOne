describe('Auto-Generated Cypress Test', () => {
  it('Replays user session', () => {
    cy.visit('https://www.geeksforgeeks.org/runtime-environments-in-compiler-design/');
    // Intercept and wait for network request to https://r.clarity.ms/collect
    cy.intercept('https://r.clarity.ms/collect').as('request0');
    cy.wait('@request0').its('response.statusCode').should('eq', 200);
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
    // Scroll to bottom
    cy.scrollTo('bottom');
    // Intercept and wait for network request to https://r.clarity.ms/collect
    cy.intercept('https://r.clarity.ms/collect').as('request41');
    cy.wait('@request41').its('response.statusCode').should('eq', 200);
    // Intercept and wait for network request to https://px.ads.linkedin.com/wa/
    cy.intercept('https://px.ads.linkedin.com/wa/').as('request42');
    cy.wait('@request42').its('response.statusCode').should('eq', 200);
    // Intercept and wait for network request to https://analytics.google.com/g/collect?v=2&tid=G-SZ454CLTZM&gtm=45je54g3v885296220z8838943698za200&_p=1745250353178&gcs=G111&gcd=13t3t3Z3t5l1&npa=0&dma=0&tag_exp=102015666~102803279~102813109~102887800~102926062~103027016~103051953~103055465~103077950~103106314~103106316&cid=1503901319.1745250340&ecid=1794030668&ul=en-us&sr=1280x720&uaa=x86&uab=64&uafvl=Google%2520Chrome%3B135.0.7049.96%7CNot-A.Brand%3B8.0.0.0%7CChromium%3B135.0.7049.96&uamb=0&uam=&uap=Windows&uapv=19.0.0&uaw=0&are=1&pae=1&frm=0&pscdl=noapi&_eu=AAAAAAI&_s=2&sid=1745250356&sct=1&seg=0&dl=https%3A%2F%2Fwww.geeksforgeeks.org%2Fcourses%2Fdata-science-classroom-program&dr=https%3A%2F%2Fwww.geeksforgeeks.org%2Fruntime-environments-in-compiler-design%2F&dt=Data%20Science%20Classroom%20Program&_tu=CA&en=scroll_25&_et=2739&tfd=28927
    cy.intercept('https://analytics.google.com/g/collect?v=2&tid=G-SZ454CLTZM&gtm=45je54g3v885296220z8838943698za200&_p=1745250353178&gcs=G111&gcd=13t3t3Z3t5l1&npa=0&dma=0&tag_exp=102015666~102803279~102813109~102887800~102926062~103027016~103051953~103055465~103077950~103106314~103106316&cid=1503901319.1745250340&ecid=1794030668&ul=en-us&sr=1280x720&uaa=x86&uab=64&uafvl=Google%2520Chrome%3B135.0.7049.96%7CNot-A.Brand%3B8.0.0.0%7CChromium%3B135.0.7049.96&uamb=0&uam=&uap=Windows&uapv=19.0.0&uaw=0&are=1&pae=1&frm=0&pscdl=noapi&_eu=AAAAAAI&_s=2&sid=1745250356&sct=1&seg=0&dl=https%3A%2F%2Fwww.geeksforgeeks.org%2Fcourses%2Fdata-science-classroom-program&dr=https%3A%2F%2Fwww.geeksforgeeks.org%2Fruntime-environments-in-compiler-design%2F&dt=Data%20Science%20Classroom%20Program&_tu=CA&en=scroll_25&_et=2739&tfd=28927').as('request45');
    cy.wait('@request45').its('response.statusCode').should('eq', 200);
    // Intercept and wait for network request to https://r.clarity.ms/collect
    cy.intercept('https://r.clarity.ms/collect').as('request46');
    cy.wait('@request46').its('response.statusCode').should('eq', 200);
  });
});