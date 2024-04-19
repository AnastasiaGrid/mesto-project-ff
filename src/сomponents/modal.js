const popup = document.querySelectorAll('.popup')
const popupContent = document.querySelectorAll('.popup__content')
const popupInput = document.querySelectorAll('.popup__input')

function keyHandler(evt) {
   if (evt.key === 'Escape') {
      closeModal()
  }
}
function clickHandler(evt) {
  if (evt.target) {
    closeModal()
  }
}
function stopPropagation(evt) {
  evt.stopPropagation()
}


// @todo:Открытие модального окна
export function openModal(elem) {
 elem.classList.add('popup_is-opened')

  popupInput.forEach((item) => {
    item.value = ''
  })
  window.addEventListener('keydown',keyHandler)

  popup.forEach((item) => {
   item.addEventListener('click', clickHandler)
  })

  popupContent.forEach((item) => {
    item.addEventListener('click',stopPropagation)
  })
}

// @todo:Закрытие модального окна
export function closeModal() {
  popup.forEach((item) => {
    item.classList.remove('popup_is-opened')
  })
  window.removeEventListener('keydown',keyHandler)
 }




