// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = (obj, funcRemove) => {
  // 1. Получение данных из DOM
  const cardTitle = cardTemplate.content.querySelector('.card__title');
  const cardImage = cardTemplate.content.querySelector('.card__image');

  // 2.Наполнение карточки данными
  cardTitle.textContent = obj.name;
  cardImage.src = obj.link;
  cardImage.alt = `Изображение: ${obj.name}`;

  // 3. Создание карточки с функцией удаления
  const card = cardTemplate.content.cloneNode(true);
  funcRemove(card);
  return card;
};

// @todo: Функция удаления карточки

const deleteCard = (card) => {
  // 1. Получение данных из DOM
  const removeBtn = card.querySelector('.card__delete-button');
  const removeItem = card.querySelector('.places__item');

  // 2. Обработчик события
  removeBtn.addEventListener('click', () => removeItem.remove());
};

// @todo: Вывести карточки на страницу
initialCards.map((obj) => {
  const card = createCard(obj, deleteCard);
  placesList.append(card);
});
