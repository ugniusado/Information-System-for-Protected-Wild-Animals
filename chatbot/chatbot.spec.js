describe('Chatbot', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/chatbot/index.html');  // Or the correct URL of your chatbot page
    });
  
    it('should add user message to chat after form submission', () => {
      const testMessage = 'Hello AI';
  
      cy.get('#input-text').type(testMessage);
      cy.get('#gpt3-form').submit();
  
      cy.get('.message.user-message').last().should('contain.text', testMessage);
    });
  
    it('should clear the input field after form submission', () => {
      const testMessage = 'Hello AI';
  
      cy.get('#input-text').type(testMessage);
      cy.get('#gpt3-form').submit();
  
      cy.get('#input-text').should('have.value', '');
    });
  
    it('should show an AI message after form submission', () => {
      cy.server();
      cy.route({
        method: 'POST',
        url: '/api/gpt3',
        response: { output: 'Hello, how can I help you today?' }
      });
  
      const testMessage = 'Hello AI';
  
      cy.get('#input-text').type(testMessage);
      cy.get('#gpt3-form').submit();
  
      cy.get('.message.ai-message').last().should('contain.text', 'Hello, how can I help you today?');
    });
  
    it('should show an error message when the API returns an error', () => {
      cy.server();
      cy.route({
        method: 'POST',
        url: '/api/gpt3',
        status: 500,
        response: { error: 'Test Error' }
      });
  
      const testMessage = 'Hello AI';
  
      cy.get('#input-text').type(testMessage);
      cy.get('#gpt3-form').submit();
  
      cy.get('.message.ai-message').last().should('contain.text', 'Error: Test Error');
    });
  });
  