export default class Popup {
  constructor(popupElement) {
    this._popupElement = popupElement; 
    this._handleEscClose = this._handleEscClose.bind(this); 
  }

  open() {
    this._popupElement.classList.add("popup_show");
    this._popupElement.querySelector('.popup__close-btn').addEventListener('click', this.close.bind(this)); 
    document.addEventListener("keydown", this._handleEscClose); 
  }
  
  close() {
    this._popupElement.classList.remove("popup_show");
    document.removeEventListener("keydown", this._handleEscClose); 
    this._popupElement.querySelector('.popup__close-btn').removeEventListener('click', this.close.bind(this)); 
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close(); 
    }
  }
}