import { initialCards } from './scripts/cards';
import './pages/index.css';

//Кнопки
const profileAddBtn = document.querySelector('.profile__add-button');
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = document.querySelectorAll('.popup__close');
// Поправить хард-код, когда будет время

// Popap
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');

profileEditBtn.addEventListener('click', () => {
  popupTypeEdit.classList.add('popup_is-opened');
});

profileAddBtn.addEventListener('click', () => {
  popupTypeNewCard.classList.add('popup_is-opened');
});

popupCloseBtn[0].addEventListener('click', () => {
  popupTypeEdit.classList.remove('popup_is-opened');
});
popupCloseBtn[1].addEventListener('click', () => {
  popupTypeNewCard.classList.remove('popup_is-opened');
});
// Поправить хард-код, когда будет время

// *** *** *** ***
// *** *** *** ***
// Редактирование профиля

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
console.log(profileTitle.innerHTML);
// Повесить отслеживание на value в popap и изменять innerHTML в соответствии с этим
// Не забыть отменить перезагрузку страницы при сохранении

// *** *** *** ***
// *** *** *** ***

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
