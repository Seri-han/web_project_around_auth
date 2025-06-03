class FormValidator {
  constructor(formElement) {
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    this._buttonElement = formElement.querySelector(".popup__submit");
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (!errorElement) {
      console.error(`No se encontró el mensaje de error para ${inputElement.id}`);
      return;
    }
    inputElement.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("form__input-error_active");
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (!errorElement) {
      console.error(`No se encontró el mensaje de error para ${inputElement.id}`);
      return;
    }
    inputElement.classList.remove("popup__input_type_error");
    errorElement.textContent = "";
    errorElement.classList.remove("form__input-error_active");
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add("popup__button_disabled");
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove("popup__button_disabled");
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  validateFormOnOpen() {
    this._inputList.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
    });
    this._toggleButtonState();
  }
}

export { FormValidator };
