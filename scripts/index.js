// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content
const cardElement = cardTemplate.querySelector('.places__item')

// @todo: Функция создания карточки
function addCard(item, deleteCard) {
  const cloneCard = cardElement.cloneNode(true);
  cloneCard.querySelector('.card__title').textContent = item.name;
  cloneCard.querySelector('.card__image').src = item.link;

  const deleteButtonCard = cloneCard.querySelector('.card__delete-button');
  deleteButtonCard.addEventListener('click', deleteCard);
  return cloneCard
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const target = event.target.closest('.places__item')
  target.remove()
}
// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  placesList.append(addCard(item,deleteCard))
})

