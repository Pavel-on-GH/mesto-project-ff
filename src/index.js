import { initialCards } from './scripts/cards';
import './pages/index.css';

//Кнопки
const profileAddBtn = document.querySelector('.profile__add-button');
const profileEditBtn = document.querySelector('.profile__edit-button');

// Popap
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');

// Открыть popap
profileEditBtn.addEventListener('click', () => {
  popupEdit.classList.add('popup_is-opened');
});
profileAddBtn.addEventListener('click', () => {
  popupNewCard.classList.add('popup_is-opened');
});

// Закрыть popap

const closePopap = (el) => el.classList.remove('popup_is-opened');

popupEdit.querySelector('.popup__close').addEventListener('click', () => {
  closePopap(popupEdit);
});
popupNewCard.querySelector('.popup__close').addEventListener('click', () => {
  closePopap(popupNewCard);
});

// *** *** *** ***
// *** *** *** ***
// @@@ Редактирование профиля

// Данные профиля
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
// Инпуты в popap
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputDesc = document.querySelector('.popup__input_type_description');
const popapProfileSaveBtn = popupEdit.querySelector('.popup__button');

// Отображение данных из профиля в инпут
popupInputName.value = profileTitle.innerHTML;
popupInputDesc.value = profileDesc.innerHTML;

// Изменение профиля
popapProfileSaveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  // Редактировать данные профиля
  profileTitle.innerHTML = popupInputName.value;
  profileDesc.innerHTML = popupInputDesc.value;
  // Закрыть popap
  closePopap(popupEdit);
});

//
//

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (obj, funcRemove, funcLike) => {
  // 1. Получение данных из DOM
  const card = cardTemplate.content.cloneNode(true);
  const cardTitle = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const removeBtn = card.querySelector('.card__delete-button');
  const removeItem = card.querySelector('.places__item');
  const likeBtn = card.querySelector('.card__like-button');

  // 2. Наполнение карточки данными
  cardTitle.textContent = obj.name;
  cardImage.src = obj.link;
  cardImage.alt = `Изображение: ${obj.name}`;

  // 3. Поставить / убрать лайк
  likeBtn.addEventListener('click', () => funcLike(likeBtn));

  // 4. Обработчик удаления и return
  removeBtn.addEventListener('click', () => funcRemove(removeItem));
  return card;
};

// @todo: Функция удаления карточки
const deleteCard = (card) => {
  return card.remove();
};

// Лайк
//
const funcLike = function (el) {
  el.classList.toggle('card__like-button_is-active');
};

// @todo: Вывести карточки на страницу
initialCards.map((obj) => {
  const card = createCard(obj, deleteCard, funcLike);
  placesList.append(card);
});

const popapAddSaveBtn = popupNewCard.querySelector('.popup__button');
const inputNewName = popupNewCard.querySelector('.popup__input_type_card-name');
const inputNewUrl = popupNewCard.querySelector('.popup__input_type_url');

// Функционал - добавление новой карточки
const addCard = (e) => {
  e.preventDefault();
  // Данные новой карточки
  const newObj = {
    name: inputNewName.value,
    link: inputNewUrl.value,
  };
  // Добавить новую карточку
  const card = createCard(newObj, deleteCard, funcLike);
  placesList.prepend(card);
  // Очистка формы
  inputNewName.value = '';
  inputNewUrl.value = '';

  closePopap(popupNewCard);
};

popapAddSaveBtn.addEventListener('click', addCard);
