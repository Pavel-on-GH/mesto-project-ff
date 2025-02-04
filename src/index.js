import { initialCards } from './scripts/cards';
import { deleteCard, putLikeFunc, createCard } from './components/card';
import { openPopup, closePopup } from './components/modal';
import './pages/index.css';

// @@@ Глобальные переменные и DOM узлы
const placesList = document.querySelector('.places__list');
const popupImg = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
// @Кнопки
const profileAddBtn = document.querySelector('.profile__add-button');
const profileEditBtn = document.querySelector('.profile__edit-button');
// @Popups
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImageCard = document.querySelector('.popup_type_image');
// @ Инпуты изменения данных профиля
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputDesc = document.querySelector('.popup__input_type_description');

//@@@ Функционал - откытие и закрытие popups
// @ Открыть конкретный popup
profileEditBtn.addEventListener('click', () => {
  clearInputProfile();
  openPopup(popupEdit);
});
profileAddBtn.addEventListener('click', () => {
  openPopup(popupNewCard);
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

const inputNewName = popupNewCard.querySelector('.popup__input_type_card-name');
const inputNewUrl = popupNewCard.querySelector('.popup__input_type_url');

// @@@ Редактирование профиля

// Данные профиля
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

// Отображение данных из профиля в инпут
const clearInputProfile = () => {
  popupInputName.value = profileTitle.textContent;
  popupInputDesc.value = profileDesc.textContent;
};

// @@@ Изменение профиля
popupEdit.addEventListener('submit', (e) => {
  e.preventDefault();
  // Редактировать данные профиля
  profileTitle.textContent = popupInputName.value;
  profileDesc.textContent = popupInputDesc.value;
  // Закрыть popup
  closePopup(popupEdit);
});

//@ Функция клика
const clickImg = (obj) => {
  popupImg.src = obj.link;
  popupCaption.textContent = obj.name;
  popupImg.alt = `Изображение: ${obj.name}`;
  openPopup(popupImageCard);
};

// @@@ Вывод массива карточек на страницу
initialCards.map((obj) => {
  const card = createCard(obj, deleteCard, putLikeFunc, clickImg);
  placesList.append(card);
});

// @@@ Функционал - добавление новой карточки
const addCard = (e) => {
  e.preventDefault();

  // 1. Данные новой карточки
  const newObj = {
    name: inputNewName.value,
    link: inputNewUrl.value,
  };

  // 2. Добавить новую карточку
  const card = createCard(newObj, deleteCard, putLikeFunc, clickImg);
  placesList.prepend(card);

  // 3. Очистка и закрытие формы
  e.target.reset();

  closePopup(popupNewCard);
};

// @@@ Добавление новой карточки
popupNewCard.addEventListener('submit', addCard);
