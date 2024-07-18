import FormValidator from 'cypress/support/formValidator';

describe('Login page test', () => {
	const formValidator = new FormValidator('[data-testid="form-login"]');

	beforeEach(() => {
		cy.visit('/login');
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
		cy.intercept('POST', '**/login', {
			statusCode: 200,
			body: {
				ok: true,
				data: {
					idUsuario: '123',
					email: 'user@example.com',
					ape: 'Doe',
					nom: 'John',
					permisos: ['read', 'write'],
					categorias: ['admin', 'user'],
					areas: [1, 2],
					token: 'fakeToken',
				},
				error: null,
			},
		}).as('loginRequest');

		formValidator.fillField('email', 'user@example.com');
		formValidator.fillField('password', 'password123');
		formValidator.submitForm();

		cy.wait('@loginRequest');

		formValidator.checkAlertMessage('Bienvenido!');
		formValidator.checkSuccessfulNavigation('/gestion');
	});

	it('should show error message when login fails', () => {
		cy.intercept('POST', '**/login', {
			statusCode: 400,
			body: {
				ok: false,
				data: null,
				error: 'Invalid credentials',
			},
		}).as('loginRequest');

		formValidator.fillField('email', 'user@example.com');
		formValidator.fillField('password', 'password123');
		formValidator.submitForm();

		cy.wait('@loginRequest');

		formValidator.checkAlertMessage('¡Operación Cancelada!');
	});

	it('disable submit button when is loading', () => {
		cy.intercept('POST', '**/login', {
			delay: 2000,
			statusCode: 200,
			body: {
				ok: true,
				data: {
					idUsuario: '123',
					email: 'user@example.com',
					ape: 'Doe',
					nom: 'John',
					permisos: ['read', 'write'],
					categorias: ['admin', 'user'],
					areas: [1, 2],
					token: 'fakeToken',
				},
				error: null,
			},
		}).as('loginRequest');

		formValidator.fillField('email', 'user@example.com');
		formValidator.fillField('password', 'password123');
		formValidator.submitForm();

		formValidator.checkButtonDisabled('Ingresando...');
    cy.wait('@loginRequest');
    formValidator.checkButtonDisabled('Ingresar', false);
	});
});
