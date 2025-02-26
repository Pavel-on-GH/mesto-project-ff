const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-32',
  headers: {
    authorization: 'b41f9f15-f391-43b0-b794-48aea543bfa0',
    'Content-Type': 'application/json',
  },
};
// console.log(config, config.headers, config.headers.authorization);

// @ Обработка ответа
const checkResopnse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// @@@ Функционал - получение данных
// @ Получение данных профиля с сервера
export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResopnse);
};

// @ Получение карточек с сервера
export const getCardArray = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResopnse);
};

// @@@ Функционал - редактирование
// @ Редактирование данных профиля на сервере
export const patchProfileInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type'],
    },
    body: JSON.stringify({
      name,
      about,
    }),
  }).then(checkResopnse);
};

// @ Создание новой карточки на сервере
export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type'],
    },
    body: JSON.stringify({
      name,
      link,
    }),
  }).then(checkResopnse);
};

// @ Удаление данных карточки на сервере
export const deleteRequest = (id) => {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type'],
    },
    body: JSON.stringify({
      id,
    }),
  }).then(checkResopnse);
};

// @ Добавление лайка на сервере
export const addLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type'],
    },
    body: JSON.stringify({
      id,
    }),
  }).then(checkResopnse);
};

// @ Удаление лайка на сервере
export const deleteLike = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type'],
    },
    body: JSON.stringify({
      id,
    }),
  }).then(checkResopnse);
};

// @ Обновление аватара на сервере
export const patchAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type'],
    },
    body: JSON.stringify({
      avatar,
    }),
  }).then(checkResopnse);
};
