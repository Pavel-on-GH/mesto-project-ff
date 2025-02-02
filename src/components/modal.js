import { inputNewName, inputNewUrl, clearInputProfile } from './../index';

// @Кнопки
const profileAddBtn = document.querySelector('.profile__add-button');
const profileEditBtn = document.querySelector('.profile__edit-button');

// @Popups
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupNewCard = document.querySelector('.popup_type_new-card');
export const popupImageCard = document.querySelector('.popup_type_image');

//@@@ Функционал - откытие popup
profileEditBtn.addEventListener('click', () => {
  clearInputProfile();
  openPopup(popupEdit);
});
profileAddBtn.addEventListener('click', () => {
  openPopup(popupNewCard);
});

export const openPopup = (el) => {
  el.classList.add('popup_is-animated');
  el.classList.add('popup_is-opened');
};

//@@@ Функционал - закрытие popup
export const closePopup = (el) => el.classList.remove('popup_is-opened');

// Закрыть popup
popupEdit.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupEdit);
});
popupNewCard.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupNewCard);
  inputNewName.value = '';
  inputNewUrl.value = '';
});
popupImageCard.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupImageCard);
});

// Закрыть все popups
export const closeAllPopup = () => {
  closePopup(popupEdit);
  closePopup(popupNewCard);
  closePopup(popupImageCard);
};
// Закрытие через esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllPopup();
  }
});
// Закрыть через нажатие на overlay
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup_is-opened')) {
    closeAllPopup();
  }
});
