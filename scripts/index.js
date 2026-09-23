// Etapa 1

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

// Etapa 2

const profileEditBtn = document.querySelector(".profile__edit-button");
const modal = document.querySelector("#edit-popup");
const closeBtn = modal.querySelector(".popup__close");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
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

// Etapa final

const cardTemplate = document.querySelector("#card-template").content;

const imagePopup = document.querySelector("#image-popup");
const imagePopupCloseBtn = imagePopup.querySelector(".popup__close");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

imagePopupCloseBtn.addEventListener("click", function () {
  closeModal(imagePopup);
});

function getCardElement(
  name = "Lugar sem nome",
  link = "./images/placeholder.jpg",
) {
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
