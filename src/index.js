import './pages/index.css';
import {initialCards} from "./сomponents/cards";
import {openModal} from "./сomponents/modal";
import {closeModal} from "./сomponents/modal";
import {createCard} from "./сomponents/card";
import {deleteCard} from "./сomponents/card";
import {likeCard} from "./сomponents/card";

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
const buttonProfile = document.querySelector('.profile__edit-button')
const buttonsPopupClose = document.querySelectorAll('.popup__close')
const buttonAddCard = document.querySelector('.profile__add-button')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

// @todo: Вывести карточки на страницу
initialCards.forEach(function (cardItem) {
  cardsContainer.append(createCard(cardItem,deleteCard,likeCard,openPopupImage))
})

// @todo: Открытие модальных окон
buttonProfile.addEventListener('click', () => {
  const popupEdit = document.querySelector('.popup_type_edit')
  const popupEditForm = popupEdit.querySelector('form')
  popupEditForm.reset()
  openModal(popupEdit)
  popupEditForm.addEventListener('submit', handleFormSubmit);
})

buttonAddCard.addEventListener('click', () => {
  const popupNewCard = document.querySelector('.popup_type_new-card')
  const popupNewCardForm = popupNewCard.querySelector('form')
  popupNewCardForm.reset()
  openModal(popupNewCard)
  popupNewCardForm.addEventListener('submit', handleCardAdd);
})

// @todo: Закрытие модальных окон
buttonsPopupClose.forEach((item) => {
  item.addEventListener('click', closeModal)
})

// @todo:Редактирование и сохранение имени и информации о себе
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = evt.target.name.value
  profileDescription.textContent = evt.target.description.value
  closeModal()
}

// @todo:Добавление новой карточки
function handleCardAdd(evt) {
  evt.preventDefault();
  const newPlace = {}
  newPlace.name = evt.target['place-name'].value
  newPlace.link = evt.target.link.value
  cardsContainer.prepend(createCard(newPlace,deleteCard,likeCard,openPopupImage))
  closeModal()
}

// @todo:Открытие попапа с картинкой
function openPopupImage(imgSrc, caption) {
  const popupImage = document.querySelector('.popup__image')
  const popupCaption = document.querySelector('.popup__caption')
  popupImage.src = imgSrc
  popupCaption.textContent = caption
  popupImage.alt = caption
}
