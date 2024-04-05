// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content
const cardElement = cardTemplate.querySelector('.places__item')

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
  const cloneCard = cardElement.cloneNode(true);
  cloneCard.querySelector('.card__title').textContent = cardData.name;

  const cardImage = cloneCard.querySelector('.card__image')
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const deleteButtonCard = cloneCard.querySelector('.card__delete-button');
  deleteButtonCard.addEventListener('click', () => deleteCard(cloneCard));
  return cloneCard
}

// @todo: Функция удаления карточки
function deleteCard(card) {
  card.remove()
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (cardItem) {
  cardsContainer.append(createCard(cardItem,deleteCard))
})

