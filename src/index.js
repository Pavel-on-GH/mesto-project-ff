import { initialCards } from './scripts/cards';
import './pages/index.css';

//Кнопки
const profileAddBtn = document.querySelector('.profile__add-button');
const profileEditBtn = document.querySelector('.profile__edit-button');

// Popup
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImageCard = document.querySelector('.popup_type_image');
const popupImg = document.querySelector('.popup__image');

// Открыть popup
profileEditBtn.addEventListener('click', () => {
  openPopup(popupEdit);
});
profileAddBtn.addEventListener('click', () => {
  openPopup(popupNewCard);
});

// Закрыть popup

const openPopup = (el) => el.classList.add('popup_is-opened');
const closePopup = (el) => el.classList.remove('popup_is-opened');

popupEdit.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupEdit);
});
popupNewCard.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupNewCard);
});
popupImageCard.querySelector('.popup__close').addEventListener('click', () => {
  closePopup(popupImageCard);
});

// *** *** *** ***
// *** *** *** ***
// @@@ Редактирование профиля

// Данные профиля
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
// Инпуты в popup
const popupInputName = document.querySelector('.popup__input_type_name');
const popupInputDesc = document.querySelector('.popup__input_type_description');
const popupProfileSaveBtn = popupEdit.querySelector('.popup__button');

// Отображение данных из профиля в инпут
popupInputName.value = profileTitle.innerHTML;
popupInputDesc.value = profileDesc.innerHTML;

// Изменение профиля
popupProfileSaveBtn.addEventListener('click', (e) => {
  e.preventDefault();
  // Редактировать данные профиля
  profileTitle.innerHTML = popupInputName.value;
  profileDesc.innerHTML = popupInputDesc.value;
  // Закрыть popup
  closePopup(popupEdit);
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

  // 3.5 Открытие картинки - вынести функционал во вне функции
  cardImage.addEventListener('click', () => {
    popupImg.src = obj.link;
    openPopup(popupImageCard);
  });

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

const popupAddSaveBtn = popupNewCard.querySelector('.popup__button');
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

  closePopup(popupNewCard);
};

popupAddSaveBtn.addEventListener('click', addCard);
