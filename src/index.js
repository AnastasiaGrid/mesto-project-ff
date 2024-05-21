import './pages/index.css';
import {logPlugin} from "@babel/preset-env/lib/debug";
import {postNewCard, getCards, getUserInfo, updateProfileInfo, updateProfileImg} from "./сomponents/api";
import {openModal, closeModal} from "./сomponents/modal";
import {createCard, deleteCard, toggleLikeCard} from "./сomponents/card";
import {enableValidation, clearValidation} from "./сomponents/validation";

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
const popupNewCard = document.querySelector('.popup_type_new-card')
const popupEdit = document.querySelector('.popup_type_edit')
const profileImage = document.querySelector('.profile__image')
const popupEditImage = document.querySelector('.popup_type_edit_profile_image')

const popupEditForm = document.forms['edit-profile']
const popupEditFormInputName = popupEditForm.querySelector('.popup__input_type_name')
const popupEditFormInputDescription = popupEditForm.querySelector('.popup__input_type_description')
const popupNewCardForm = document.forms['new-place']
const popupEditProfileImageForm = document.forms['edit-profile-image']
const popupEditFormProfileImage = popupEditProfileImageForm.querySelector('.popup__input_type_url')

//Обработка полученных данных с сервера(получение карточек и информации о пользователе)
const arrayResponse = [getUserInfo(), getCards()]
Promise.all(arrayResponse)
.then((responses) => {
  const [userInfo, cards] = responses
  setProfileInfo(userInfo, profileTitle, profileDescription, profileImage)
  addCards(cards,userInfo)
})
.catch(error => alert(error))


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
  popupEditFormInputName.value = profileTitle.textContent
  popupEditFormInputDescription.value = profileDescription.textContent
  openModal(popupEdit)
  const validationConfig = {
    formSelector: '.popup_type_edit',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }
  clearValidation(validationConfig)
  enableValidation(validationConfig);
})

//Редактирование и сохранение имени и информации о себе
function submitFormEditProfile(evt) {
  console.log(evt)
  evt.preventDefault();
  const popupSaveButton = popupEditForm.querySelector('.popup__button')
  renderLoading(true, popupSaveButton)
  const targetNameValue = evt.target.name.value;
  const targetDescriptionValue = evt.target.description.value;
  updateProfileInfo(targetNameValue, targetDescriptionValue)
  .then((res) => {
    profileTitle.textContent = targetNameValue
    profileDescription.textContent = targetDescriptionValue
    closeModal()
  })
  .catch(error => alert(error))
  .finally(() => {
    renderLoading(false, popupSaveButton)
  })
}

popupEditForm.addEventListener('submit', submitFormEditProfile);


//Открытие попап добавления НОВОЙ КАРТОЧКИ (в т.ч. валидация)
buttonAddCard.addEventListener('click', () => {
  openModal(popupNewCard)
  const validationConfig = {
    formSelector: '.popup_type_new-card',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }
  clearValidation(validationConfig)
  enableValidation(validationConfig);
})

// Добавление новой карточки
async function submitFormAddCard(evt) {
  evt.preventDefault();
  const popupSaveButton = popupNewCardForm.querySelector('.popup__button')
  renderLoading(true, popupSaveButton)
  const nameTargetValue = evt.target['place-name'].value;
  const linkTargetValue = evt.target.link.value
  try {
    const responseCardData = await postNewCard(nameTargetValue, linkTargetValue)
    cardsContainer.prepend(createCard(responseCardData,deleteCard,toggleLikeCard,openPopupImage, responseCardData['owner']['_id']))
    closeModal()
    evt.target.reset()
  } catch(err) {
    alert(err)
  }
  renderLoading(false, popupSaveButton)
}
popupNewCardForm.addEventListener('submit', submitFormAddCard);


// Вешаем на аватарку открытие формы ИЗМЕНЕНИЕ АВАТАРКИ
profileImage.addEventListener('click', () => {
  openModal(popupEditImage)
  const validationConfig = {
    formSelector: '.popup_type_edit_profile_image',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }
  clearValidation(validationConfig)
  enableValidation(validationConfig);
})

// Отправка формы изменения аватарки
function submitProfileImage(evt) {
  evt.preventDefault();
  const popupSaveButton = popupEditProfileImageForm.querySelector('.popup__button')
  renderLoading(true, popupSaveButton)
  const profileImageURL = evt.target['link-input-avatar'].value
  updateProfileImg(profileImageURL)
  .catch(error => alert(error))
  .finally((res) => {
    renderLoading(false, popupSaveButton)
  })
  profileImage.setAttribute('style', `background-image: url(${profileImageURL})`)
  closeModal()
}

popupEditProfileImageForm.addEventListener('submit', submitProfileImage);

//Открытие попапа с картинкой
function openPopupImage(imgSrc, caption) {
  openModal(popupTypeImage)
  popupImage.src = imgSrc
  popupCaption.textContent = caption
  popupImage.alt = caption
}

//Закрытие модальных окон
buttonsPopupClose.forEach((buttonClose) => {
  buttonClose.addEventListener('click', closeModal)
})

//Loader
function renderLoading(isLoading, popupSaveButton) {
  if (isLoading) {
    popupSaveButton.textContent = 'Сохранение...'
  } else {
    popupSaveButton.textContent = 'Сохранить'
  }

}