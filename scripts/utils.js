import { FormValidator } from "./FormValidator.js";

function openPopup(popup) {
  if (!popup) {
    console.error("Popup no encontrado");
    return;
  }
  popup.classList.add("popup_show");
  document.addEventListener("keydown", handleEscClose); 

  if (popup.id === "popupForm") {
    const formElement = popup.querySelector(".popup__form");
    const formValidator = new FormValidator(formElement);
    formValidator.validateFormOnOpen();
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_show");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_show");
    if (activePopup) closePopup(activePopup);
  }
}

function closePopupOnOverlay(evt) {
  if (evt.target.classList.contains('popup_show')) {
    closePopup(evt.target);
  }
}

function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_show');
    if(activePopup) closePopup(activePopup);
  }
}


export { openPopup, closePopup, handleEscClose, closePopupOnOverlay, closePopupOnEsc };
