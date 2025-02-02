import { initialCards } from './scripts/cards';
import { deleteCard, funcLike, imgClick, addCard, createCard } from './components/card';
import { closePopup, popupEdit, popupNewCard } from './components/modal';
import './pages/index.css';

// @@@ Глобальная переменные и DOM узлы
export const cardTemplate = document.querySelector('#card-template');
export const placesList = document.querySelector('.places__list');
export const popupImg = document.querySelector('.popup__image');
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
  popupInputName.value = profileTitle.innerHTML;
  popupInputDesc.value = profileDesc.innerHTML;
};

// @@@ Изменение профиля
popupEdit.addEventListener('submit', (e) => {
  e.preventDefault();
  // Редактировать данные профиля
  profileTitle.innerHTML = popupInputName.value;
  profileDesc.innerHTML = popupInputDesc.value;
  // Закрыть popup
  closePopup(popupEdit);
});

// @@@ Вывод массива карточек на страницу
initialCards.map((obj) => {
  const card = createCard(obj, deleteCard, funcLike, imgClick);
  placesList.append(card);
});

// @@@ Добавление новой карточки
popupNewCard.addEventListener('submit', addCard);
