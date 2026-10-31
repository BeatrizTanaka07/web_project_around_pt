import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { openModal, closeModal, resetFormValidation } from "./utils.js";

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

const editProfilePopup = document.querySelector("#edit-popup");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const modalTitle = editProfilePopup.querySelector(
  ".popup__input.popup__input_type_name",
);
const modalDescription = editProfilePopup.querySelector(
  ".popup__input.popup__input_type_description",
);

function fillProfileForm() {
  modalTitle.value = profileTitle.textContent;
  modalDescription.value = profileDescription.textContent;
}

const editProfileForm = editProfilePopup.querySelector("#edit-profile-form");

function handleOpenEditModal() {
  resetFormValidation(editProfileForm, config);
  fillProfileForm();
  openModal(editProfilePopup);
}

const editProfileBtn = document.querySelector(".profile__edit-button");

editProfileBtn.addEventListener("click", function () {
  handleOpenEditModal();
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = modalTitle.value;
  profileDescription.textContent = modalDescription.value;
  closeModal(editProfilePopup);
}

editProfilePopup.addEventListener("submit", handleProfileFormSubmit);

// Card rendering and New Card Modal

function renderCard(name, link, container, method) {
  const card = new Card(name, link, "#card-template");
  const cardEl = card.getCardElement();
  if (method === "append") {
    container.append(cardEl);
  } else {
    container.prepend(cardEl);
  }
}

const cardsContainer = document.querySelector(".cards__list");

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer, "append");
});

const newCardModal = document.querySelector("#new-card-popup");

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const name = newCardModal.querySelector(
    ".popup__input.popup__input_type_card-name",
  ).value;
  const link = newCardModal.querySelector(
    ".popup__input.popup__input_type_url",
  ).value;

  renderCard(name, link, cardsContainer, "prepend");

  closeModal(newCardModal);
}

newCardModal.addEventListener("submit", handleCardFormSubmit);

const newCardBtn = document.querySelector(".profile__add-button");
const newCardForm = newCardModal.querySelector("#new-card-form");

newCardBtn.addEventListener("click", () => {
  openModal(newCardModal, () => {
    resetFormValidation(newCardForm, config);
  });
});

const forms = document.querySelectorAll(".popup__form");

forms.forEach((form) => {
  const formValidator = new FormValidator(config, form);
  formValidator.setEventListeners();
});
