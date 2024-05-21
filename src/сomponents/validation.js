//Проверяет, есть ли невалидные поля
const hasInvalidInput = (inputList) => {
  return inputList.some((item) => {
    return !item.validity.valid
  })
}

//Включает/выключает кнопку в зависимость от того, есть ли невалидное поле
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disable', 'true')
    buttonElement.classList.add(inactiveButtonClass)
  }else {
    buttonElement.setAttribute('disable', 'false')
    buttonElement.classList.remove(inactiveButtonClass)
  }
}

//Показывает ошибку
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(inputErrorClass)
  formError.textContent = errorMessage;
  formError.classList.add(errorClass)
}

//Скрывает ошибку
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const formError = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(inputErrorClass)
  formError.textContent = ''
  formError.classList.remove(errorClass)
}

//На основании валидности вызывает кастомную ошибку
const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
//На основании валидности вызывает функции открытия и закрытия
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass)
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass)
  }
}

//Валидация всей формы
export function enableValidation({
  formSelector, inputSelector, submitButtonSelector,inactiveButtonClass, inputErrorClass, errorClass}) {
  const formElement = document.querySelector(formSelector);
  const buttonElement = formElement.querySelector(submitButtonSelector)
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  //Для каждого инпута включает валидацию и выключает кнопку
  const setEventListeners = (formElement) => {
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((input) => {
      input.addEventListener('input', () => {
        isValid(formElement, input, inputErrorClass, errorClass)
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      })
    })
  }
  setEventListeners(formElement)
}

//Скрывает ошибки, которые остаются после закрытие попапа с ошибкой
export function clearValidation({formSelector, inputSelector, inputErrorClass, errorClass}) {
  const formElement = document.querySelector(formSelector);
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  inputList.forEach((input) => {
    hideInputError(formElement, input, inputErrorClass, errorClass)
    isValid(formElement, input, inputErrorClass, errorClass)
  })
}
