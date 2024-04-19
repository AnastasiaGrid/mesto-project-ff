import {openModal} from "../сomponents/modal";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content
const cardElement = cardTemplate.querySelector('.places__item')

// @todo: Функция создания карточки
export function createCard(cardData, deleteCard, likeCard, openPopupImage) {
  const cloneCard = cardElement.cloneNode(true);
  cloneCard.querySelector('.card__title').textContent = cardData.name;

  const cardImage = cloneCard.querySelector('.card__image')
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const cardLikeButton = cloneCard.querySelector('.card__like-button')
  cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton));

  const popupTypeImage = document.querySelector('.popup_type_image')

  cardImage.addEventListener('click', () => {
    openModal(popupTypeImage)
    openPopupImage(cardImage.src, cardData.name)
  })

  const deleteButtonCard = cloneCard.querySelector('.card__delete-button');
  deleteButtonCard.addEventListener('click', () => deleteCard(cloneCard));
  return cloneCard
}

// @todo: Функция удаления карточки
export function deleteCard(card) {
  card.remove()
}

// @todo:Лайк
export function likeCard(elem) {
  elem.classList.toggle('card__like-button_is-active')
}