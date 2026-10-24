// openModal e closeModal

export function openModal(modal) {
  modal.classList.add("popup_is-opened");

  const submitBtn = modal.querySelectorAll(".popup__button");
  if (submitBtn) {
    submitBtn.forEach((btn) => {
      btn.classList.add("popup__button_disabled");
      btn.setAttribute("disabled", true);
      resetFormValidation(modal);
    });
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

// open edit profile modal

const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector("#edit-popup");

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editProfilePopup);
}

editProfileBtn.addEventListener("click", function () {
  handleOpenEditModal();
});
