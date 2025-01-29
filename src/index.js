import { initialCards } from './scripts/cards';

import './pages/index.css';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (obj, funcRemove) => {
  // 1. Получение данных из DOM
  const card = cardTemplate.content.cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const removeBtn = card.querySelector('.card__delete-button');
  const removeItem = card.querySelector('.places__item');

  // 2.Наполнение карточки данными
  cardTitle.textContent = obj.name;
  cardImage.src = obj.link;
  cardImage.alt = `Изображение: ${obj.name}`;

  // 3. Обработчик удаления и return
  removeBtn.addEventListener('click', () => funcRemove(removeItem));
  return card;
};

// @todo: Функция удаления карточки
const deleteCard = (card) => {
  return card.remove();
};

// @todo: Вывести карточки на страницу
initialCards.map((obj) => {
  const card = createCard(obj, deleteCard);
  placesList.append(card);
});
