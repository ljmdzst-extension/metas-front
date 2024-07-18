class FormValidator {
  private formSelector: string;

  constructor(formSelector: string) {
    this.formSelector = formSelector;
  }

  checkFormVisible() {
    cy.get(this.formSelector).should('be.visible');
  }

  submitForm() {
    cy.get(this.formSelector).submit();
  }

  checkFieldError(fieldName: string, errorMessage: string) {
    cy.get(`input[name="${fieldName}"]`)
      .siblings('.invalid-feedback')
      .contains(errorMessage)
      .should('be.visible');
  }

  fillField(fieldName: string, value: string) {
    cy.get(`input[name="${fieldName}"]`).type(value);
  }

  checkButtonDisabled(buttonText: string, disabled: boolean = true) {
    cy.get('button')
      .contains(buttonText)
      .should(disabled ? 'be.disabled' : 'not.be.disabled');
  }

  checkSuccessfulNavigation(expectedUrl: string) {
    cy.url().should('include', expectedUrl);
  }

  checkAlertMessage(message: string) {
    cy.get('.swal2-popup').should('be.visible').contains(message);
  }
}

export default FormValidator;
