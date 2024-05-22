function closeOnEscape(evt) {
    if (evt.key === 'Escape') {
      const popupOpen = document.querySelector('.popup_is-opened')
      if (popupOpen) {
        closeModal(popupOpen)
      }
    }
}

function stopPropagation(evt) {
  evt.stopPropagation()
}

function closeByEventTarget(evt) {
  closeModal(evt.target.closest('.popup'))
}

// Открытие модального окна
export function openModal(popup) {
  popup.classList.add('popup_is-opened')
  popup.addEventListener('click',closeByEventTarget)
  popup.querySelector('.popup__content').addEventListener('click',stopPropagation)
  popup.querySelector('.popup__close').addEventListener('click', closeByEventTarget)
  window.addEventListener('keydown',closeOnEscape)
}

// Закрытие модального окна
export function closeModal(popup) {
  const popupContent = popup.querySelector('.popup__content')
  popup.classList.remove('popup_is-opened')

  popupContent.removeEventListener('click',stopPropagation)
  popup.removeEventListener('click',closeByEventTarget)
  popup.querySelector('.popup__close').removeEventListener('click',closeByEventTarget)
  window.removeEventListener('keydown',closeOnEscape)
}




