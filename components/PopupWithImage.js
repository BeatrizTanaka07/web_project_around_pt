import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    const imagePopupCaption = this._popup.querySelector(".popup__caption");
    const imagePopupImage = this._popup.querySelector(".popup__image");

    imagePopupCaption.textContent = name;
    imagePopupImage.src = link;
    imagePopupImage.alt = name;

    super.open();
  }
}
