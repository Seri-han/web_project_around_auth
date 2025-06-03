import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupElement, handleSubmit) {
    super(popupElement);
    this._handleSubmit = handleSubmit;
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._inputList = Array.from(this._formElement.querySelectorAll(".popup__input"));
  }

  _getInputValues() {
    const formData = {};
    this._inputList.forEach((input) => {
      formData[input.name] = input.value;
    });
    return formData;
  }

  setEventListeners() {
    super.setEventListeners(); 
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); 
      if (this._formElement.checkValidity()) { 
        this._handleSubmit(this._getInputValues()); 
        this.close(); 
      }
    });
    this._formElement.addEventListener("reset", () => { 
      this._hideInputErrors(); 
      this._inputList.forEach((input) => {
        input.value = ''; 
      });
    });
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("popup__input_type_error");
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add("form__input-error_active");
  }

  _hideInputErrors() {
    this._inputList.forEach((inputElement) => {
      inputElement.classList.remove("popup__input_type_error");
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      if (errorElement) {
        errorElement.textContent = "";
        errorElement.classList.remove("form__input-error_active");
      }
    });
  }

  close() {
    super.close(); 
    this._formElement.reset(); 
    this._hideInputErrors(); 
  }
}