import { openModal } from "./utils.js";

const imagePopup = document.querySelector("#image-popup");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

export class Card {
  constructor(name, link, templateSelector) {
    this.name = name;
    this.link = link;
    this.templateSelector = templateSelector;
  }

  _generateMarkup() {
    const cardElement = document
      .querySelector(this.templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");

    cardImage.src = this.link;
    cardImage.alt = this.name;
    cardTitle.textContent = this.name;

    return cardElement;
  }

  _handleLikeButtonClick(likeButton) {
    likeButton.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteButtonClick(cardElement) {
    cardElement.remove();
  }

  _handleCardImageClick() {
    imagePopupCaption.textContent = this.name;
    imagePopupImage.src = this.link;
    imagePopupImage.alt = this.name;
    openModal(imagePopup);
  }

  _setEventListeners(cardElement) {
    const likeButton = cardElement.querySelector(".card__like-button");

    likeButton.addEventListener("click", () => {
      this._handleLikeButtonClick(likeButton);
    });

    const deleteButton = cardElement.querySelector(".card__delete-button");

    deleteButton.addEventListener("click", () => {
      this._handleDeleteButtonClick(cardElement);
    });

    const cardImage = cardElement.querySelector(".card__image");

    cardImage.addEventListener("click", () => {
      this._handleCardImageClick();
    });

    return cardElement;
  }

  getCardElement() {
    const cardElement = this._generateMarkup();
    this._setEventListeners(cardElement);
    return cardElement;
  }
}
