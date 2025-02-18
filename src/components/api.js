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

// @ Экспорты
export const cardsArray = await getCardArray();
export const profileInfo = await getProfile();
