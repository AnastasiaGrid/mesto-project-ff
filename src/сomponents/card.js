import {logPlugin} from "@babel/preset-env/lib/debug";
import {deleteUserCard, putLikeCard, deleteLikeCard} from "./api";

//Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content
const cardElement = cardTemplate.querySelector('.places__item')

/**
 *
 * @param cardData object объект карточки
 * @param deleteCard Function функция удаления карточки
 * @param toggleLikeCard Function функция постановки\снятия лайка
 * @param openPopupImage Function функция открытия попапа с картинкой
 * @param userInfoId string id пользователя
 */

//Клонирование шаблона карточки
function getCardTemplate(cardData) {
   const cloneCard = cardElement.cloneNode(true);
   return cloneCard
}

// Функция создания карточки
export function createCard(cardData, deleteCard, toggleLikeCard, openPopupImage, userInfoId) {
 const cloneCard = getCardTemplate(cardData)
  cloneCard.querySelector('.card__title').textContent = cardData.name;
  const cardImage = cloneCard.querySelector('.card__image')
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  //Счетчик лайков
  const likesScore = cloneCard.querySelector('.card__like-score')
  likesScore.textContent = cardData.likes.length
  //Ставит/убирает лайк при нажатии
  const cardLikeButton = cloneCard.querySelector('.card__like-button')
  cardLikeButton.addEventListener('click', () => toggleLikeCard(cardLikeButton, cardData, likesScore ));
  //После обновления страницы ставит класс активного лайка там, где я поставила
  if (cardData.likes.some((item) => item['_id'] === userInfoId)) {
    cardLikeButton.classList.add('card__like-button_is-active')
  }
  // Открытие попапа с картинкой
  cardImage.addEventListener('click', () => {
    openPopupImage(cardImage.src, cardData.name)
  })
  // Реализация появление корзинки только у моей карточки
  const deleteButtonCard = cloneCard.querySelector('.card__delete-button');
  if (cardData['owner']['_id'] === userInfoId) {
    deleteButtonCard.classList.remove('card__like-button-invisible')
    deleteButtonCard.addEventListener('click', () => deleteCard(cloneCard, cardData['_id']));
  }
  return cloneCard
}

//Функция удаления карточки
export function deleteCard(card, cardUserId) {
  card.remove()
  deleteUserCard(cardUserId)
  .then(() => {
    card.remove()
  })
  .catch(err => console.log(err))

}

// Лайк
export function toggleLikeCard(cardLikeButton, cardData, likesScore) {
  if (!cardLikeButton.classList.contains('card__like-button_is-active')) {
    const responsePutLikes = putLikeCard(cardData['_id'])
    .then((responsePutLike) => {
      likesScore.textContent = responsePutLike.likes.length
      cardLikeButton.classList.add('card__like-button_is-active')
    })
    .catch(err => console.log(err))
  } else {
      const responseDeleteLikes = deleteLikeCard(cardData['_id'])
      .then((responsePutLike) => {
        likesScore.textContent = responsePutLike.likes.length
        cardLikeButton.classList.remove('card__like-button_is-active')
      })
      .catch(err => console.log(err))
  }
}



