import './pages/index.css';
import {logPlugin} from "@babel/preset-env/lib/debug";
import {postNewCard, getCards, getUserInfo, updateProfileInfo, updateProfileImg} from "./сomponents/api";
import {openModal} from "./сomponents/modal";
import {closeModal} from "./сomponents/modal";
import {createCard} from "./сomponents/card";
import {deleteCard} from "./сomponents/card";
import {toggleLikeCard} from "./сomponents/card";
import {enableValidation} from "./сomponents/validation";
import {clearValidation} from "./сomponents/validation";


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
const popupEditForm = document.forms['edit-profile']
const popupNewCardForm = document.forms['new-place']
const popupEditFormInputName = popupEditForm.querySelector('.popup__input_type_name')
const popupEditFormInputDescription = popupEditForm.querySelector('.popup__input_type_description')
const profileImage = document.querySelector('.profile__image')
const popupEditImage = document.querySelector('.popup_type_edit_profile_image')
const popupEditProfileImageForm = document.forms['edit-profile-image']
const popupEditFormProfileImage = popupEditProfileImageForm.querySelector('.popup__input_type_url')

//Обработка полученных данных с сервера
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
  arrayCards.forEach((item) => {
    cardsContainer.append(createCard(item,deleteCard,toggleLikeCard,openPopupImage, userInfo['_id']))
    })
}



// @todo: Открытие модальных окон
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
  // clear form previous init
  clearValidation(validationConfig)
  enableValidation(validationConfig);
})

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

// @todo: Закрытие модальных окон
buttonsPopupClose.forEach((item) => {
  item.addEventListener('click', closeModal)
})

// @todo:Редактирование и сохранение имени и информации о себе
function submitFormEditProfile(evt) {
  evt.preventDefault();
  const popupSaveButton = popupEditForm.querySelector('.popup__button')
  renderLoading(true, popupSaveButton)
  updateProfileInfo(evt.target.name.value, evt.target.description.value)
  .then((res) => {
    profileTitle.textContent = evt.target.name.value
    profileDescription.textContent = evt.target.description.value
    closeModal()
  })
  .catch(error => alert(error))
  .finally(() => {
    renderLoading(false, popupSaveButton)
  })
}

popupEditForm.addEventListener('submit', submitFormEditProfile);

// @todo:Добавление новой карточки
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

// @todo:Открытие попапа с картинкой
function openPopupImage(imgSrc, caption) {
  openModal(popupTypeImage)
  popupImage.src = imgSrc
  popupCaption.textContent = caption
  popupImage.alt = caption
}

// Вешаем на аватарку открытие формы
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
  .finally((res) => {
    renderLoading(false, popupSaveButton)
  })
  profileImage.setAttribute('style', `background-image: url(${profileImageURL})`)
  closeModal()
}

popupEditProfileImageForm.addEventListener('submit', submitProfileImage);


//Loader
function renderLoading(isLoading, popupSaveButton) {
  if (isLoading) {
    popupSaveButton.textContent = 'Сохранение...'
  } else {
    popupSaveButton.textContent = 'Сохранить'
  }

}