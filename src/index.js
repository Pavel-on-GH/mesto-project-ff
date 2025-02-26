import { deleteCard, createCard } from './components/card';
import { openPopup, closePopup, saveFunc } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import './pages/index.css';
import {
  getCardArray,
  getProfile,
  patchProfileInfo,
  addNewCard,
  patchAvatar,
} from './components/api';

// @@@ Глобальные переменные и DOM узлы
const placesList = document.querySelector('.places__list');
const popupImg = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupAvatar = document.querySelector('.popup_avatar');
// @Кнопки
const profileAddBtn = document.querySelector('.profile__add-button');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAvatar = document.querySelector('.profile__image');
// @Popups
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImageCard = document.querySelector('.popup_type_image');
// @ Инпуты изменения данных профиля
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputDesc = document.querySelector('.popup__input_type_description');
// @ Инпуты новой карточки
const inputNewName = popupNewCard.querySelector('.popup__input_type_card-name');
const inputNewUrl = popupNewCard.querySelector('.popup__input_type_url');
// @ Инпут аватара
const inputAvatar = popupAvatar.querySelector('.popup__input_avatar_url');
// @ Формы
const editProfileForm = document.forms['edit-profile'];
const newCardForm = document.forms['new-place'];
const avatarForm = document.forms['new-avatar'];
// @ Данные профиля
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
// @ Объъект валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
};

// @@@ Promise all
Promise.all([getProfile(), getCardArray()])
  .then((res) => {
    // @@@ Функционал - отображение данных профиля с сервера
    const profileInfo = res[0];
    profileTitle.textContent = profileInfo.name;
    profileDesc.textContent = profileInfo.about;
    profileAvatar.src = profileInfo.avatar;
    profileAvatar.style = `background-image: url(
  ${profileInfo.avatar}
  )`;
    let userId = profileInfo._id;

    // @@@ Функционал - вывод массива карточек на страницу
    const cardsArray = res[1];
    cardsArray.map((obj) => {
      const card = createCard(obj, deleteCard, clickImg, userId);
      placesList.append(card);
    });
  })
  .catch((err) => console.log(err));

//@@@ Функционал - откытие и закрытие popups
// @ Открыть конкретный popup
profileEditBtn.addEventListener('click', () => {
  clearValidation(editProfileForm, validationConfig);
  clearInputProfile();
  openPopup(popupEdit);
});
profileAddBtn.addEventListener('click', () => {
  clearValidation(newCardForm, validationConfig);
  openPopup(popupNewCard);
});
profileAvatar.addEventListener('click', () => {
  avatarForm.reset();
  clearValidation(popupAvatar, validationConfig);
  openPopup(popupAvatar);
});

// @ Закрыть конкретный popup
popupEdit.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupEdit);
});
popupNewCard.querySelector('.popup__close').addEventListener('click', (e) => {
  closePopup(popupNewCard);
});
popupImageCard.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupImageCard);
});
popupAvatar.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupAvatar);
});

// @@@ Редактирование профиля
// Отображение данных из профиля в инпут
const clearInputProfile = () => {
  popupInputName.value = profileTitle.textContent;
  popupInputDesc.value = profileDesc.textContent;
};

// @@@ Изменение профиля
popupEdit.addEventListener('submit', (e) => {
  e.preventDefault();

  // UX сохранения
  const saveBtn = popupEdit.querySelector('.popup__button');
  saveBtn.textContent = 'Сохранение...';

  // Редактировать данные профиля
  patchProfileInfo(popupInputName.value, popupInputDesc.value)
    .then((res) => {
      console.log(res);
      profileTitle.textContent = res.name;
      profileDesc.textContent = res.about;
      // Закрыть popup
      closePopup(popupEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => setTimeout(() => saveFunc(saveBtn), 1000));
});

//@ Функция клика
const clickImg = (obj) => {
  popupImg.src = obj.link;
  popupCaption.textContent = obj.name;
  popupImg.alt = `Изображение: ${obj.name}`;
  openPopup(popupImageCard);
};

// @@@ Функционал - добавление новой карточки
const addCard = (e) => {
  e.preventDefault();
  // UX сохранения
  const saveBtn = popupNewCard.querySelector('.popup__button');
  saveBtn.textContent = 'Сохранение...';

  // 1. Данные новой карточки
  const newObj = {
    name: inputNewName.value,
    link: inputNewUrl.value,
  };

  // 2. Добавить новую карточку
  addNewCard(newObj.name, newObj.link)
    .then((res) => {
      const card = createCard(res, deleteCard, clickImg, res._id);
      placesList.prepend(card);
      closePopup(popupNewCard);
      // Очистка и закрытие формы
      e.target.reset();
    })
    .catch((res) => console.log(res))
    .finally(() => setTimeout(() => saveFunc(saveBtn), 1000));
};

// @@@ Добавление новой карточки
popupNewCard.addEventListener('submit', addCard);

// @@@ Вызов функции валидации
enableValidation(validationConfig);

// @@@ Изменение аватара
popupAvatar.addEventListener('submit', (e) => {
  e.preventDefault();

  // UX сохранения
  const saveBtn = popupAvatar.querySelector('.popup__button');
  saveBtn.textContent = 'Сохранение...';

  // Изменить аватар и обновить данные на сервере
  patchAvatar(inputAvatar.value);

  profileAvatar.style = `background-image: url(
  ${inputAvatar.value}
  )`;

  // Закрыть popup
  closePopup(popupAvatar);
  setTimeout(() => saveFunc(saveBtn), 1000);
});
