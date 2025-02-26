// @ Показать текст ошибки
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
};

// @ Скрыть текст ошибки
const clearInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};

// @ Проверить валидность
const isValid = (formElement, inputElement, validationConfig) => {
  // Проверка для случая, вызывающего кастомноное сообщение об ошибке

  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    clearInputError(formElement, inputElement, validationConfig);
  }
};

// @ Добавление слушателя ввода на каждый input формы
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toogleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validationConfig);
      toogleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// Добавление setEventListeners на каждую форму
export const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

// @ Проверка валидности для каждого input
const hasInvalidInput = (inputList) => {
  return inputList.some((item) => {
    return !item.validity.valid;
  });
};

// @ Сделать кнопку не активной
const toogleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// @@@ Функционал - удаление ошибок валидации при повторном открытии popap
export const clearValidation = (profileForm, validationConfig) => {
  const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);
  const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((inputElement) => {
    clearInputError(profileForm, inputElement, validationConfig);
  });
  toogleButtonState(inputList, buttonElement, validationConfig);
};
