import { deleteRequest, addLike, deleteLike } from './api';

const cardTemplate = document.querySelector('#card-template');

// @ Функция удаления карточки
export const deleteCard = (card, id) => {
  deleteRequest(id);
  return card.remove();
};

// @ Функция лайка
export const putLikeFunc = function (el) {
  el.classList.toggle('card__like-button_is-active');
};

// @@@ Функционал - создание карточки
export const createCard = (obj, removeFunc, putLikeFunc, ckickImgFunc) => {
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
  const countLikes = card.querySelector('.count-likes');

  // Счётчик лайков
  obj.likes ? (countLikes.textContent = obj.likes.length) : (countLikes.textContent = 0);

  // Отображение активного лайка
  if (obj.likes.some((e) => e._id === '1bc1bf3083883fb81f64b793')) {
    likeBtn.classList.add('card__like-button_is-active');
  }

  likeBtn.addEventListener('click', () => {
    putLikeFunc(likeBtn);

    if (likeBtn.classList.contains('card__like-button_is-active')) {
      addLike(obj._id);
      // countLikes.textContent = obj.likes.length;
      countLikes.textContent = +countLikes.textContent + 1;
    } else {
      deleteLike(obj._id);
      // countLikes.textContent = obj.likes.length;
      countLikes.textContent = +countLikes.textContent - 1;
    }
  });

  // 4. Открытие картинки
  cardImage.addEventListener('click', () => ckickImgFunc(obj));

  // 5. Обработчик удаления и return - с проверкой, является ли пользователь создателем карточки
  if (obj.owner && obj.owner._id !== '1bc1bf3083883fb81f64b793') {
    removeBtn.style.display = 'none';
  }

  removeBtn.addEventListener('click', () => removeFunc(removeItem, obj._id));
  return card;
};
