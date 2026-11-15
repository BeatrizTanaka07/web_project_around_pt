import { Card } from "../components/Card.js";
import {
  FormValidator,
  resetFormValidation,
} from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
  inactiveButtonClass: "popup__button_disabled",
};

// Edit Profile Modal

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const editProfilePopup = document.querySelector("#edit-popup");

const modalTitle = editProfilePopup.querySelector(
  ".popup__input.popup__input_type_name",
);
const modalDescription = editProfilePopup.querySelector(
  ".popup__input.popup__input_type_description",
);

function sendEditProfileForm() {
  userInfo.setUserInfo({
    name: modalTitle.value,
    job: modalDescription.value,
  });
}

const editProfileForm = new PopupWithForm(sendEditProfileForm, "#edit-popup");

editProfileForm.setEventListeners();

function openEditProfile() {
  resetFormValidation(editProfileForm._form, config);

  const userData = userInfo.getUserInfo();
  modalTitle.value = userData.name;
  modalDescription.value = userData.job;

  editProfileForm.open();
}

const editProfileBtn = document.querySelector(".profile__edit-button");

editProfileBtn.addEventListener("click", function () {
  openEditProfile();
});

// Card rendering

function renderCard(item) {
  const card = new Card(item.name, item.link, "#card-template", () => {
    cardImagePopup.open(item.name, item.link);
  });

  const cardEl = card.getCardElement();

  return cardEl;
}

const initialCardsRendering = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list",
);

initialCardsRendering.renderItems();

// New Card Modal

function sendCardForm(inputValues) {
  renderCard({
    name: inputValues["place-name"],
    link: inputValues["link"],
  });
}

const newCardForm = new PopupWithForm(sendCardForm, "#new-card-popup");

newCardForm.setEventListeners();

function openNewCardForm() {
  resetFormValidation(newCardForm._form, config);
  newCardForm.open();
}

const newCardBtn = document.querySelector(".profile__add-button");

newCardBtn.addEventListener("click", openNewCardForm);

// Card Image Popup

const cardImagePopup = new PopupWithImage("#image-popup");

cardImagePopup.setEventListeners();

// Form Validator

const forms = document.querySelectorAll(".popup__form");

forms.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.setEventListeners();
});
