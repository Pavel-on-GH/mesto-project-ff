const cardTemplate = document.querySelector('#card-template');

// @ Функция удаления карточки
export const deleteCard = (card) => {
  return card.remove();
};

// @ Функция лайка
export const funcLike = function (el) {
  el.classList.toggle('card__like-button_is-active');
};

// @@@ Функционал - создание карточки
export const createCard = (obj, funcRemove, funcLike, funcImgClick) => {
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

  // 4. Открытие картинки
  cardImage.addEventListener('click', () => funcImgClick(obj));

  // 5. Обработчик удаления и return
  removeBtn.addEventListener('click', () => funcRemove(removeItem));
  return card;
};
