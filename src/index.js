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
const buttonPopupClose = document.querySelectorAll('.popup__close')
const buttonAddCard = document.querySelector('.profile__add-button')

const formElementEdit = document.forms['edit-profile']
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

const formElementCards = document.forms['new-place']
const placeInput = document.querySelector('.popup__input_type_card-name')
const urlInput = document.querySelector('.popup__input_type_url')


// @todo: Вывести карточки на страницу
initialCards.forEach(function (cardItem) {
  cardsContainer.append(createCard(cardItem,deleteCard,likeCard,openPopupImage))
})

// @todo: Открытие модальных окон
buttonProfile.addEventListener('click', () => {
  const popupEdit = document.querySelector('.popup_type_edit')
  openModal(popupEdit)
})

buttonAddCard.addEventListener('click', () => {
  const popupNewCard = document.querySelector('.popup_type_new-card')
  openModal(popupNewCard)
})

// @todo: Закрытие модальных окон
buttonPopupClose.forEach((item) => {
  item.addEventListener('click', closeModal)
})

// @todo:Редактирование имени и информации о себе
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value
  profileDescription.textContent = jobInput.value
  closeModal()
}
formElementEdit.addEventListener('submit', handleFormSubmit);

// @todo:Добавление новой карточки
function handleCardAdd(evt) {
  evt.preventDefault();
  const newPlace = {}
  newPlace.name = placeInput.value
  newPlace.link = urlInput.value
  cardsContainer.prepend(createCard(newPlace,deleteCard,likeCard,openPopupImage))
  closeModal()
}

formElementCards.addEventListener('submit', handleCardAdd);


// @todo:Открытие попапа с картинкой
function openPopupImage(imgSrc, caption) {
  const popupImage = document.querySelector('.popup__image')
  const popupCaption = document.querySelector('.popup__caption')
  popupImage.src = imgSrc
  popupCaption.textContent = caption
  popupImage.alt = caption
}
