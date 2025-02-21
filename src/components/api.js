// @@@ Функционал - получение данных
// @ Получение данных профиля с сервера
const getProfile = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-32/users/me', {
    headers: {
      authorization: 'b41f9f15-f391-43b0-b794-48aea543bfa0',
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
};

// @ Получение карточек с сервера
const getCardArray = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-32/cards', {
    headers: {
      authorization: 'b41f9f15-f391-43b0-b794-48aea543bfa0',
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
};

// @@@ Функционал - редактирование
// @ Редактирование данных профиля на сервере
export const patchProfileInfo = (name, about) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-32/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'b41f9f15-f391-43b0-b794-48aea543bfa0',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      about,
    }),
  });
};

// @ Создание новой карточки на сервере
export const addNewCard = (name, link) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-32/cards', {
    method: 'POST',
    headers: {
      authorization: 'b41f9f15-f391-43b0-b794-48aea543bfa0',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      link,
    }),
  });
};

// @ Удаление данных карточки на сервере
export const deleteRequest = (id) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-32/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'b41f9f15-f391-43b0-b794-48aea543bfa0',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  });
};

// @ Удаление данных карточки на сервере
export const addLike = (id) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-32/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: 'b41f9f15-f391-43b0-b794-48aea543bfa0',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  });
};
// @ Удаление данных карточки на сервере
export const deleteLike = (id) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-32/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: 'b41f9f15-f391-43b0-b794-48aea543bfa0',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
    }),
  });
};

// @ Экспорты
export const cardsArray = await getCardArray();
export const profileInfo = await getProfile();

// deleteCard('67b6502f4620ae1a71f726ad');
