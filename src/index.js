import { deleteCard, putLikeFunc, createCard } from './components/card';
import { openPopup, closePopup, saveFunc } from './components/modal';
import { enableValidation } from './components/validation';
import './pages/index.css';
import {
  getCardArray,
  getProfile,
  patchProfileInfo,
  addNewCard,
  patchAvatar,
} from './components/api';

// !!! ВРЕМЕННО - асинхронные функции
const cardsArray = await getCardArray();
const profileInfo = await getProfile();

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

//@@@ Функционал - откытие и закрытие popups
// @ Открыть конкретный popup
profileEditBtn.addEventListener('click', () => {
  clearInputProfile();
  openPopup(popupEdit);
});
profileAddBtn.addEventListener('click', () => {
  openPopup(popupNewCard);
});
profileAvatar.addEventListener('click', () => {
  openPopup(popupAvatar);
});

// @ Закрыть конкретный popup
popupEdit.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupEdit);
});
popupNewCard.querySelector('.popup__close').addEventListener('click', (e) => {
  closePopup(popupNewCard);
  inputNewName.value = '';
  inputNewUrl.value = '';
});
popupImageCard.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupImageCard);
});
popupAvatar.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupAvatar);
});

// @@@ Редактирование профиля

// Данные профиля
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

// Отображение данных профиля с сервера
profileTitle.textContent = profileInfo.name;
profileDesc.textContent = profileInfo.about;
profileAvatar.src = profileInfo.avatar;
profileAvatar.style = `background-image: url(
  ${profileInfo.avatar}
  )`;

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
  profileTitle.textContent = popupInputName.value;
  profileDesc.textContent = popupInputDesc.value;
  patchProfileInfo(popupInputName.value, popupInputDesc.value);

  // Закрыть popup
  closePopup(popupEdit);
  setTimeout(() => saveFunc(saveBtn), 1000);
});

//@ Функция клика
const clickImg = (obj) => {
  popupImg.src = obj.link;
  popupCaption.textContent = obj.name;
  popupImg.alt = `Изображение: ${obj.name}`;
  openPopup(popupImageCard);
};

// @@@ Вывод массива карточек на страницу
cardsArray.map((obj) => {
  const card = createCard(obj, deleteCard, putLikeFunc, clickImg);
  placesList.append(card);
});

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
  const card = createCard(newObj, deleteCard, putLikeFunc, clickImg);
  addNewCard(newObj.name, newObj.link);
  placesList.prepend(card);

  // 3. Очистка и закрытие формы
  e.target.reset();

  closePopup(popupNewCard);
  setTimeout(() => saveFunc(saveBtn), 1000);
};

// @@@ Добавление новой карточки
popupNewCard.addEventListener('submit', addCard);

// @@@ Вызов функции валидации
enableValidation();

// @@@ Изменение аватара
popupAvatar.addEventListener('submit', (e) => {
  e.preventDefault();

  // UX сохранения
  const saveBtn = popupAvatar.querySelector('.popup__button');
  saveBtn.textContent = 'Сохранение...';

  // Изменить аватар и обновить данные на сервере
  patchAvatar(inputAvatar.value);

  console.log(popupAvatar, saveBtn, '123');
  profileAvatar.style = `background-image: url(
  ${inputAvatar.value}
  )`;

  // Очистить инпут
  inputAvatar.value = '';

  // Закрыть popup
  closePopup(popupAvatar);
  setTimeout(() => saveFunc(saveBtn), 1000);
});
