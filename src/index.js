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
// @@@ Редактирование профиля

// Данные профиля
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
// Инпуты в popap
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputDesc = document.querySelector('.popup__input_type_description');
const popapProfileSaveBtn = popupTypeEdit.querySelector('.popup__button');

// Отображение данных из профиля в инпут
popupInputName.value = profileTitle.innerHTML;
popupInputDesc.value = profileDesc.innerHTML;

popapProfileSaveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  // Редактировать данные профиля
  profileTitle.innerHTML = popupInputName.value;
  profileDesc.innerHTML = popupInputDesc.value;
  // Закрыть popap
  popupTypeEdit.classList.remove('popup_is-opened');
});

//
//

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
  const LikeBtn = card.querySelector('.card__like-button');

  // 1.5 Лайк
  // вынести в отдельную функцию
  const funcLike = () => LikeBtn.classList.toggle('card__like-button_is-active');

  LikeBtn.addEventListener('click', funcLike);

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

// Лайк
// const cardLikeBtn = document.querySelector('.card__like-button');

// @todo: Вывести карточки на страницу
initialCards.map((obj) => {
  const card = createCard(obj, deleteCard);
  placesList.append(card);
});
