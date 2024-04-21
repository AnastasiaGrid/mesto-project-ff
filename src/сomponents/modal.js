function keyHandler(evt) {
   if (evt.key === 'Escape') {
      closeModal()
  }
}

function stopPropagation(evt) {
  evt.stopPropagation()
}

// @todo:Открытие модального окна
export function openModal(popup) {
  popup.classList.add('popup_is-opened')
  popup.addEventListener('click', closeModal)
  popup.querySelector('.popup__content').addEventListener('click',stopPropagation)
  window.addEventListener('keydown',keyHandler)
}

// @todo:Закрытие модального окна
export function closeModal() {
  const popupOpen = document.querySelector('.popup_is-opened')
  popupOpen.classList.remove('popup_is-opened')
  window.removeEventListener('keydown',keyHandler)
 }




