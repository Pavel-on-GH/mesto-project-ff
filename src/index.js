import { initialCards } from './scripts/cards';
import { deleteCard, funcLike, createCard } from './components/card';
import { openPopup, closePopup, popupImageCard, popupEdit, popupNewCard } from './components/modal';
import './pages/index.css';

// @@@ Глобальная переменные и DOM узлы
export const cardTemplate = document.querySelector('#card-template');
export const placesList = document.querySelector('.places__list');
export const popupImg = document.querySelector('.popup__image');
export const popupCaption = document.querySelector('.popup__caption');
export const inputNewName = popupNewCard.querySelector('.popup__input_type_card-name');
export const inputNewUrl = popupNewCard.querySelector('.popup__input_type_url');

// @@@ Редактирование профиля

// Данные профиля
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

// Инпуты изменения данных профиля
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputDesc = document.querySelector('.popup__input_type_description');

// Отображение данных из профиля в инпут
export const clearInputProfile = () => {
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
export const clickImg = (obj) => {
  popupImg.src = obj.link;
  popupCaption.textContent = obj.name;
  popupImg.alt = `Изображение: ${obj.name}`;
  openPopup(popupImageCard);
};

// @@@ Вывод массива карточек на страницу
initialCards.map((obj) => {
  const card = createCard(obj, deleteCard, funcLike, clickImg);
  placesList.append(card);
});

// @@@ Функционал - добавление новой карточки
export const addCard = (e) => {
  e.preventDefault();

  // 1. Данные новой карточки
  const newObj = {
    name: inputNewName.value,
    link: inputNewUrl.value,
  };

  // 2. Добавить новую карточку
  const card = createCard(newObj, deleteCard, funcLike, clickImg);
  placesList.prepend(card);

  // 3. Очистка и закрытие формы
  e.target.reset();

  closePopup(popupNewCard);
};

// @@@ Добавление новой карточки
popupNewCard.addEventListener('submit', addCard);
