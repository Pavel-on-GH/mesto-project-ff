//@@@ Функционал - открытие popup
export const openPopup = (el) => {
  el.classList.add('popup_is-animated');
  el.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeKeydown);
  document.addEventListener('click', closeClick);
};

//@@@ Функционал - закрытие popup
export const closePopup = (el) => {
  el.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeKeydown);
  document.removeEventListener('keydown', closeClick);
};

// Закрытие через esc
const closeKeydown = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup);
  }
};

// Закрыть через нажатие на overlay
const closeClick = (e) => {
  if (e.target.classList.contains('popup_is-opened')) {
    closePopup(e.target);
  }
};
