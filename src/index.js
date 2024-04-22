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
const popupImage = document.querySelector('.popup__image')
const popupCaption = document.querySelector('.popup__caption')
const popupTypeImage = document.querySelector('.popup_type_image')

const popupEditForm = document.forms['edit-profile']
const popupNewCardForm = document.forms['new-place']

// @todo: Вывести карточки на страницу
initialCards.forEach(function (cardItem) {
  cardsContainer.append(createCard(cardItem,deleteCard,likeCard,openPopupImage))
})

// @todo: Открытие модальных окон
buttonProfile.addEventListener('click', () => {
  const popupEdit = document.querySelector('.popup_type_edit')
  popupEditForm.querySelector('.popup__input_type_name').value = profileTitle.textContent
  popupEditForm.querySelector('.popup__input_type_description').value =  profileDescription.textContent
  openModal(popupEdit)
})

buttonAddCard.addEventListener('click', () => {
  const popupNewCard = document.querySelector('.popup_type_new-card')
  openModal(popupNewCard)
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
popupEditForm.addEventListener('submit', handleFormSubmit);

// @todo:Добавление новой карточки
function handleCardAdd(evt) {
  evt.preventDefault();
  const newPlace = {}
  newPlace.name = evt.target['place-name'].value
  newPlace.link = evt.target.link.value
  cardsContainer.prepend(createCard(newPlace,deleteCard,likeCard,openPopupImage))
  closeModal()
  evt.target.reset()
}
popupNewCardForm.addEventListener('submit', handleCardAdd);


// @todo:Открытие попапа с картинкой
function openPopupImage(imgSrc, caption) {
  openModal(popupTypeImage)
  popupImage.src = imgSrc
  popupCaption.textContent = caption
  popupImage.alt = caption
}
