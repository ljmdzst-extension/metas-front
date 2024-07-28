import FormValidator from 'cypress/support/formValidator';

describe('Login page test', () => {
	const formValidator = new FormValidator('[data-testid="form-login"]');

	beforeEach(() => {
		cy.visit('/login');
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

	it('should render login form', () => {
		formValidator.checkFormVisible();
	});

	it('should show required error messages for empty fields', () => {
		formValidator.submitForm();
		formValidator.checkFieldError('email', 'Email es requerido');
		formValidator.checkFieldError('password', 'Contraseña es requerida');
	});

	it('should show invalid email error message for invalid email', () => {
		formValidator.fillField('email', 'invalid-email');
		formValidator.submitForm();
		formValidator.checkFieldError('email', 'Email inválido');
	});

	it('should login successfully with correct credentials', () => {
		cy.fixture('auth/loginSuccess.json').then((loginSuccess) => {
			cy.intercept('POST', '**/login', {
				delay: 2000,
				statusCode: 200,
				body: loginSuccess,
			}).as('loginRequest');
		});

		formValidator.fillField('email', 'user@example.com');
		formValidator.fillField('password', 'password123');
		formValidator.submitForm();

		cy.wait('@loginRequest');

		formValidator.checkAlertMessage('Bienvenido!');
		formValidator.checkSuccessfulNavigation('/gestion');
	});

	it('should show error message when login fails', () => {
		cy.fixture('auth/loginFailure.json').then((response) => {
			cy.intercept('POST', '**/login', {
				statusCode: 400,
				body: response,
			}).as('loginRequest');
		});
		formValidator.fillField('email', 'user@example.com');
		formValidator.fillField('password', 'password123');
		formValidator.submitForm();

		cy.wait('@loginRequest');

		formValidator.checkAlertMessage('¡Operación Cancelada!');
	});

	it('disable submit button when is loading', () => {
		cy.fixture('auth/loginSuccess.json').then((loginSuccess) => {
			cy.intercept('POST', '**/login', {
				delay: 2000,
				statusCode: 200,
				body: loginSuccess,
			}).as('loginRequest');
		});

		formValidator.fillField('email', 'user@example.com');
		formValidator.fillField('password', 'password123');
		formValidator.submitForm();

		formValidator.checkButtonDisabled('Ingresando...');
    cy.wait('@loginRequest');
    formValidator.checkButtonDisabled('Ingresar', false);
		
	
	});
});
