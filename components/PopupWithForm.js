import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(sendForm, popupSelector) {
    super(popupSelector);
    this._sendForm = sendForm;
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    const inputValues = {};

    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    const inputValues = this._getInputValues();
    this._sendForm(inputValues);
    this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleFormSubmit);
  }

  open() {
    super.open();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
