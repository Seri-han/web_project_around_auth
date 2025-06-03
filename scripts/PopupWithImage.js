import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._imageContainer = this._popupElement.querySelector(".popup__image-container");
    this._imageTitle = this._popupElement.querySelector(".popup__image-title");
  }

  open(imageSrc, imageAlt, imageTitle) {
    super.open();
    this._imageContainer.src = imageSrc;
    this._imageContainer.alt = imageAlt;
    this._imageTitle.textContent = imageTitle;
  }
}