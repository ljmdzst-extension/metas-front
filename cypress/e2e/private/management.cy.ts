// cypress/integration/gestion/management.cy.js

describe('Management Screen', () => {
  beforeEach(() => {
    localStorage.setItem('authToken', 'fakeToken');
    

    cy.visit('/gestion');

    cy.intercept('GET', '**/bases', {
			delay: 2000,
			statusCode: 200,
			body: {
				"ok": true,
				"data": [],
				"error": null
			},
		}).as('basesRequest');

   
  });

  it('should render three buttons', () => {
    cy.get('button').should('have.length', 3);
  });

  it('should have one enabled button and two disabled buttons', () => {
    cy.get('button').eq(0).should('not.be.disabled').and('contain', 'Planificaciones y resultados');
    cy.get('button').eq(1).should('be.disabled').and('contain', 'Gestor de Proyectos de Extensión');
    cy.get('button').eq(2).should('be.disabled').and('contain', 'Gestor de P.E.E.E');
  });

  it('should navigate to /gestion/metas when the enabled button is clicked', () => {
    cy.get('button').eq(0).click();
    cy.url().should('include', '/gestion/metas');

    cy.intercept('GET', '**/programas/**', {
			delay: 2000,
			statusCode: 200,
			body: {
				"ok": true,
				"data": [],
				"error": null
			},
		}).as('programasRequest');
  });
});
