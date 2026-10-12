// Projeto 8 Etapa 1

let initialCards = [
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

// Projeto 8 Etapa 2

const profileEditBtn = document.querySelector(".profile__edit-button");
const modal = document.querySelector("#edit-popup");
const closeBtn = modal.querySelector(".popup__close");

function openModal(modal) {
  modal.classList.add("popup_is-opened");

  const sendButton = modal.querySelector(".popup__button");

  sendButton.classList.add("popup__button_disabled");
  sendButton.setAttribute("disabled", true);

  resetFormValidation(modal);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

profileEditBtn.addEventListener("click", function () {
  handleOpenEditModal();
});
closeBtn.addEventListener("click", function () {
  closeModal(modal);
});

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const modalTitle = modal.querySelector(".popup__input.popup__input_type_name");
const modalDescription = modal.querySelector(
  ".popup__input.popup__input_type_description",
);

function fillProfileForm() {
  modalTitle.value = profileTitle.textContent;
  modalDescription.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(modal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = modalTitle.value;
  profileDescription.textContent = modalDescription.value;
  closeModal(modal);
}

modal.addEventListener("submit", handleProfileFormSubmit);

// Projeto 8 Etapa final

const cardTemplate = document.querySelector("#card-template").content;

const imagePopup = document.querySelector("#image-popup");
const imagePopupCloseBtn = imagePopup.querySelector(".popup__close");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

imagePopupCloseBtn.addEventListener("click", function () {
  closeModal(imagePopup);
});

function getCardElement(name, link) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", function () {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImage.addEventListener("click", function () {
    imagePopupCaption.textContent = name;
    imagePopupImage.src = link;
    imagePopupImage.alt = name;
    openModal(imagePopup);
  });

  return cardElement;
}

function renderCard(name, link, container, method) {
  const cardEl = getCardElement(name, link);
  if (method === "append") {
    container.append(cardEl);
  } else {
    container.prepend(cardEl);
  }
}

const cardsContainer = document.querySelector(".cards__list");

initialCards.forEach(function (card) {
  renderCard(card.name, card.link, cardsContainer, "append");
});

const newCardBtn = document.querySelector(".profile__add-button");
const newCardModal = document.querySelector("#new-card-popup");
const newCardCloseBtn = newCardModal.querySelector(".popup__close");

newCardBtn.addEventListener("click", function () {
  openModal(newCardModal);
});
newCardCloseBtn.addEventListener("click", function () {
  closeModal(newCardModal);
});

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

// Projeto 9 Etapa 1 e 2

function showInputError(input, errorMessage) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  input.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
}

function hideInputError(formElement, input) {
  const errorElement = formElement.querySelector(`#${input.id}-error`);
  input.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__error_visible");
}

function hasInvalidInput(inputList) {
  return Array.from(inputList).some((input) => !input.validity.valid);
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__button_disabled");
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove("popup__button_disabled");
    buttonElement.removeAttribute("disabled");
  }
}

function setEventListeners(formElement) {
  const inputs = formElement.querySelectorAll(".popup__input");
  const saveButton = formElement.querySelector(".popup__button");

  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (!input.validity.valid) {
        showInputError(input, input.validationMessage);
      } else {
        hideInputError(formElement, input);
      }

      toggleButtonState(inputs, saveButton);
    });
  });

  formElement.addEventListener("submit", function (evt) {
    if (!formElement.checkValidity()) {
      evt.preventDefault();
    }
  });
}

const forms = document.querySelectorAll(".popup__form");

forms.forEach((form) => {
  setEventListeners(form);
});

// Projeto 9 Etapa 3

const overlay = document.querySelectorAll(".popup");

overlay.forEach((popup) => {
  popup.addEventListener("click", function (event) {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
});

// Projeto 9 Etapa 4

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
});

// Extra: redefinir a validação dos formulários

function resetFormValidation(formElement) {
  const inputs = formElement.querySelectorAll(".popup__input");
  inputs.forEach((input) => {
    hideInputError(formElement, input);
  });
}
