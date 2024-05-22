//Loader
export function renderLoading(isLoading, popupSaveButton) {
  if (isLoading) {
    popupSaveButton.textContent = 'Сохранение...'
  } else {
    popupSaveButton.textContent = 'Сохранить'
  }
}
