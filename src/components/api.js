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

export const cardsArray = await getCardArray();
export const profileInfo = await getProfile();
console.log(cardsArray, profileInfo);
