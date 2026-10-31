export class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this.formElement = formElement;
  }

  _showInputError(input, errorMessage) {
    const errorElement = this.formElement.querySelector(`#${input.id}-error`);
    input.classList.add(this.config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.errorClass);
  }

  _hideInputError(input) {
    const errorElement = this.formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(this.config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this.config.errorClass);
  }

  _hasInvalidInput(inputList) {
    return Array.from(inputList).some((input) => !input.validity.valid);
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.config.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove(this.config.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  setEventListeners() {
    const inputs = this.formElement.querySelectorAll(this.config.inputSelector);
    const saveButton = this.formElement.querySelector(
      this.config.submitButtonSelector,
    );

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (!input.validity.valid) {
          this._showInputError(input, input.validationMessage);
        } else {
          this._hideInputError(input);
        }

        this._toggleButtonState(inputs, saveButton);
      });
    });

    this.formElement.addEventListener("submit", (evt) => {
      if (!this.formElement.checkValidity()) {
        evt.preventDefault();
      }
    });
  }
}
