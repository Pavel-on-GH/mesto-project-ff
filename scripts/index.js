// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const cardTitle = cardTemplate.content.querySelector('.card__title');
const cardImage = cardTemplate.content.querySelector('.card__image');

// @todo: Функция создания карточки
const createCard = (obj) => {
  cardTitle.textContent = obj.name;
  cardImage.src = obj.link;
  const card = cardTemplate.content.cloneNode(true);
  return card;
};

// @todo: Функция удаления карточки
const deleteCard = (card) => {
  card
    .querySelector('.card__delete-button')
    .addEventListener('click', (e) => e.target.closest('.places__item').remove());
};

// @todo: Вывести карточки на страницу

initialCards.map((obj) => {
  const card = createCard(obj);
  deleteCard(card);
  placesList.append(card);
});
