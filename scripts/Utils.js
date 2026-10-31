// openModal and closeModal

function openModal(modal, fn) {
  modal.classList.add("popup_is-opened");

  const submitBtn = modal.querySelectorAll(".popup__button");
  if (submitBtn) {
    submitBtn.forEach((btn) => {
      btn.classList.add("popup__button_disabled");
      btn.setAttribute("disabled", true);
    });
  }

  if (fn) {
    fn(modal);
  }

  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

// close button

const closeBtn = document.querySelectorAll(".popup__close");

closeBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    closeModal(btn.closest(".popup"));
  });
});

// close modal on overlay click

const popupList = document.querySelectorAll(".popup");

popupList.forEach((popup) => {
  popup.addEventListener("click", function (event) {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
});

// close modal on ESC key press

function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// reset form validation

function resetFormValidation(formElement, config) {
  const inputs = formElement.querySelectorAll(config.inputSelector);
  inputs.forEach((input) => {
    const errorElement = formElement.querySelector(`#${input.id}-error`);
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(config.errorClass);
    input.value = "";
  });
}

export { openModal, closeModal, resetFormValidation };
