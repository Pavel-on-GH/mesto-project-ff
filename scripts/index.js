// @todo: Темплейт карточки
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const cardTitle = cardTemplate.content.querySelector('.card__title');
const cardImage = cardTemplate.content.querySelector('.card__image');

// @todo: Функция создания карточки

// @todo: Функция удаления карточки
const deleteCard = (card) => {
  card
    .querySelector('.card__delete-button')
    .addEventListener('click', (e) => e.target.closest('.places__item').remove());
};

// @todo: Вывести карточки на страницу

initialCards.map((i) => {
  cardTitle.textContent = i.name;
  cardImage.src = i.link;
  let card = cardTemplate.content.cloneNode(true);
  deleteCard(card);
  placesList.append(card);
});
