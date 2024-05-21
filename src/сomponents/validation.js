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

//На основании валидности вызывает функция ошибки
const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass)
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass)
  }
}


export function enableValidation({
  formSelector, inputSelector, submitButtonSelector,inactiveButtonClass, inputErrorClass, errorClass}) {
  const formElement = document.querySelector(formSelector);
  const buttonElement = formElement.querySelector(submitButtonSelector)
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  //Для каждого инпута включает валидацию
  const setEventListeners = (formElement) => {
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((item) => {
      item.addEventListener('input', () => {
        isValid(formElement, item, inputErrorClass, errorClass)
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      })
    })
  }
  setEventListeners(formElement)

}

export function clearValidation({formSelector, inputSelector, inputErrorClass, errorClass}) {
  const formElement = document.querySelector(formSelector); // form
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  inputList.forEach((item) => {
    hideInputError(formElement, item, inputErrorClass, errorClass)
    isValid(formElement, item, inputErrorClass, errorClass)
  })

}
