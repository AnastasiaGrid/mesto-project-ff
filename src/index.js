import './pages/index.css';
import {logPlugin} from "@babel/preset-env/lib/debug";
import {postNewCard, getCards, getUserInfo, updateProfileInfo, updateProfileImg} from "./сomponents/api";
import {openModal, closeModal} from "./сomponents/modal";
import {createCard, deleteCard, toggleLikeCard} from "./сomponents/card";
import {renderLoading} from "./сomponents/utils";
import {enableValidation, clearValidation} from "./сomponents/validation";


// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
const buttonProfile = document.querySelector('.profile__edit-button')
const buttonAddCard = document.querySelector('.profile__add-button')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const popupImage = document.querySelector('.popup__image')
const popupCaption = document.querySelector('.popup__caption')
const popupTypeImage = document.querySelector('.popup_type_image')
const popupNewCard = document.querySelector('.popup_type_new-card')
const popupEdit = document.querySelector('.popup_type_edit')
const profileImage = document.querySelector('.profile__image')
const popupEditImage = document.querySelector('.popup_type_edit_profile_image')

const popupEditForm = document.forms['edit-profile']
const popupEditFormInputName = popupEditForm.querySelector('.popup__input_type_name')
const popupEditFormInputDescription = popupEditForm.querySelector('.popup__input_type_description')
const popupNewCardForm = document.forms['new-place']
const popupEditProfileImageForm = document.forms['edit-profile-image']

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
enableValidation(validationConfig);

//Обработка полученных данных с сервера(получение карточек и информации о пользователе)
const initialPromises = [getUserInfo(), getCards()]
Promise.all(initialPromises)
.then((responses) => {
  const [userInfo, cards] = responses
  setProfileInfo(userInfo, profileTitle, profileDescription, profileImage)
  addCards(cards,userInfo)
})
.catch(error => console.log(error))


//Достаем данные из сервера и заполняем профиль
function setProfileInfo(arrayProfileInfo, profileTitle, profileDescription, profileImage) {
    profileTitle.textContent = arrayProfileInfo['name'];
    profileDescription.textContent = arrayProfileInfo['about'];
    profileImage.setAttribute('style', `background-image: url(${arrayProfileInfo['avatar']})`)
  }

//Выводятся карточки на страницу из сервера
function addCards(arrayCards,userInfo) {
  arrayCards.forEach((card) => {
    cardsContainer.append(createCard(card,deleteCard,toggleLikeCard,openPopupImage, userInfo['_id']))
    })
}

//Открытие попапа ИЗМЕНЕНИЕ ПРОФИЛЯ (в т.ч. валидация)
buttonProfile.addEventListener('click', () => {
  clearValidation(popupEdit, validationConfig)
  popupEditFormInputName.value = profileTitle.textContent
  popupEditFormInputDescription.value = profileDescription.textContent
  openModal(popupEdit)
})

//Редактирование и сохранение имени и информации о себе
function submitFormEditProfile(evt) {
  evt.preventDefault();
  const popupSaveButton = popupEditForm.querySelector('.popup__button')
  renderLoading(true, popupSaveButton)
  const targetNameValue = evt.target.name.value;
  const targetDescriptionValue = evt.target.description.value;
  updateProfileInfo(targetNameValue, targetDescriptionValue)
  .then((res) => {
    profileTitle.textContent = targetNameValue
    profileDescription.textContent = targetDescriptionValue
    closeModal(popupEdit)
  })
  .catch(error => console.log(error))
  .finally(() => {
    renderLoading(false, popupSaveButton)
  })
}

popupEditForm.addEventListener('submit', submitFormEditProfile);


//Открытие попап добавления НОВОЙ КАРТОЧКИ (в т.ч. валидация)
buttonAddCard.addEventListener('click', () => {
  clearValidation(popupNewCard, validationConfig)
  openModal(popupNewCard)
})

// Добавление новой карточки
function submitFormAddCard(evt) {
  evt.preventDefault();
  const popupSaveButton = popupNewCardForm.querySelector('.popup__button')
  renderLoading(true, popupSaveButton)
  const nameTargetValue = evt.target['place-name'].value;
  const linkTargetValue = evt.target.link.value

 postNewCard(nameTargetValue, linkTargetValue)
  .then((responseCardData) => {
    cardsContainer.prepend(createCard(responseCardData,deleteCard,toggleLikeCard,openPopupImage, responseCardData['owner']['_id']))
    closeModal(popupNewCard)
    evt.target.reset()
  })
 .catch(error => console.log(error))
  .finally(() => {
    renderLoading(false, popupSaveButton)
  })
}
popupNewCardForm.addEventListener('submit', submitFormAddCard);


// Вешаем на аватарку открытие формы ИЗМЕНЕНИЕ АВАТАРКИ
profileImage.addEventListener('click', () => {
  clearValidation(popupEditImage, validationConfig)
  openModal(popupEditImage)
})

// Отправка формы изменения аватарки
function submitProfileImage(evt) {
  evt.preventDefault();
  const popupSaveButton = popupEditProfileImageForm.querySelector('.popup__button')
  renderLoading(true, popupSaveButton)
  const profileImageURL = evt.target['link-input-avatar'].value
  updateProfileImg(profileImageURL)
  .then(() => {
    profileImage.setAttribute('style', `background-image: url(${profileImageURL})`)
    closeModal(popupEditImage)
    evt.target.reset()
  })
  .catch(error => console.log(error))
  .finally((res) => {
    renderLoading(false, popupSaveButton)
  })
}

popupEditProfileImageForm.addEventListener('submit', submitProfileImage);

//Открытие попапа с картинкой
function openPopupImage(imgSrc, caption) {
  openModal(popupTypeImage)
  popupImage.src = imgSrc
  popupCaption.textContent = caption
  popupImage.alt = caption
}