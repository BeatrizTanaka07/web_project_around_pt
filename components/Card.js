export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this.name = name;
    this.link = link;
    this.templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    this._handleCardClick(this.name, this.link);
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
