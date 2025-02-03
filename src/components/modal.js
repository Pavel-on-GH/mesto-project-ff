export const openPopup = (el) => {
  el.classList.add('popup_is-animated');
  el.classList.add('popup_is-opened');
};

//@@@ Функционал - закрытие popup
export const closePopup = (el) => el.classList.remove('popup_is-opened');
