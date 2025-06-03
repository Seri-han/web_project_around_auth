import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import Section from './Section.js';
import Popup from './Popup.js';
import { closePopup } from "./utils.js";
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const popupForm = document.querySelector("#popupForm");
const addCardPopup = document.querySelector("#addCardPopup");
const imagesCardPopup = document.querySelector("#images-card"); 

const formValidatorPopup = new FormValidator(popupForm);
const formValidatorAddCard = new FormValidator(addCardPopup);

formValidatorPopup.enableValidation();
formValidatorAddCard.enableValidation();

const editButton = document.querySelector(".profile__info-edit-btn");
const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#job-input");

const addButton = document.querySelector(".profile__add-btn");
const titleInput = document.querySelector("#place__title-input");
const linkInput = document.querySelector("#place__link-input");

const userInfo = new UserInfo({ 
  nameSelector: '.profile__info-header', 
  jobSelector: '.profile__info-title' 
});

const editProfilePopup = new PopupWithForm(popupForm, (formData) => {
  const { name, job } = formData; 
  userInfo.setUserInfo({ name, job }); 
});

editButton.addEventListener("click", () => {
  editProfilePopup.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
});

const cardsContainer = document.querySelector('.elements'); 
const cardsSection = new Section([], (item) => item.createCard(), cardsContainer); 

const addCardPopupInstance = new PopupWithForm(addCardPopup, (formData) => {
  const { title, link } = formData; 
  const newCard = new Card(title, link);
  cardsSection.addItem(newCard); 
});

addButton.addEventListener("click", () => {
  addCardPopupInstance.open();
});

addCardPopup.querySelector(".popup__form").addEventListener("submit", function (evt) {
  evt.preventDefault();
  const titleValue = titleInput.value;
  const imageValue = linkInput.value;
  const card = new Card(titleValue, imageValue);
  const cardElement = card.createCard();
  document.querySelector('.elements').prepend(cardElement);
  closePopup(addCardPopup); 
});

popupForm.querySelector(".popup__form").addEventListener("submit", function (evt) {
  evt.preventDefault();
  const profileName = document.querySelector(".profile__info-header"); 
  const profileJob = document.querySelector(".profile__info-title"); 
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupForm);
});




// Event delegation for closing popups
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup_show')) {
    const activePopup = document.querySelector('.popup_show'); 
    if (activePopup) { 
      activePopup.classList.remove('.popup_show');
    }
  }
});

// Handle Esc key for closing popups
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const activePopup = document.querySelector('.popup_show');
    if (activePopup) {
      activePopup.classList.remove('.popup_show');
    }
  }
});

const imagesCardPopupInstance = new PopupWithImage(imagesCardPopup);

document.querySelectorAll(".element__image").forEach(image => {
  image.addEventListener("click", function () {
    const imageSrc = image.src;
    const imageAlt = image.alt;
    const imageTitle = image.nextElementSibling.textContent; 
    imagesCardPopupInstance.open(imageSrc, imageAlt, imageTitle);
  });
});

// Corrected trash button event handling
document.querySelectorAll('.element').forEach(element => {
  const trashButton = element.querySelector('.element__trash');
  trashButton.addEventListener('click', () => {
    element.remove();
  });
});




//trash and like handling
// const trashButtons = document.querySelectorAll('.element__trash');
const likeButtons = document.querySelectorAll('.element__like');

// trashButtons.forEach(button => {
//   button.addEventListener('click', (e) => {
//     const element = e.target.closest('.element');
//     element.remove();
//   });
// });

likeButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const likeButton = e.currentTarget;
    handleLikeButton(likeButton);
  });
});

function handleLikeButton(likeButton) {
  if (likeButton.classList.contains('active')) {
    likeButton.classList.remove('active');
  } else {
    likeButton.classList.add('active');
  }
}
