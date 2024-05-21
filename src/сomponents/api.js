//f998f894-a8a5-4ddf-a7a6-04867caba2b7 — так выглядит токен
// wff-cohort-13 — а так — идентификатор группы
import {logPlugin} from "@babel/preset-env/lib/debug";
const AUTHORIZATION = 'f998f894-a8a5-4ddf-a7a6-04867caba2b7'
const URL = 'https://nomoreparties.co/v1/wff-cohort-13'

export function getUserInfo() {
  return fetch(`${URL}/users/me`, {
    method: 'GET',
    headers: {
      authorization: AUTHORIZATION
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function getCards() {
  return fetch(`${URL}/cards`, {
    method: 'GET',
    headers: {
      authorization: AUTHORIZATION
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function updateProfileInfo(name,about) {
  return fetch(`${URL}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: AUTHORIZATION,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function postNewCard(name, link) {
  return fetch(`${URL}/cards`, {
    method: 'POST',
    headers: {
      authorization: AUTHORIZATION,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link,
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function deleteUserCard(cardUserId) {
  return fetch(`${URL}/cards/${cardUserId}`, {
    method: 'DELETE',
    headers: {
      authorization: AUTHORIZATION,
    },
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function putLikeCard(cardUserId) {
  return fetch(`${URL}/cards/likes/${cardUserId}`, {
    method: 'PUT',
    headers: {
      authorization: AUTHORIZATION,
    },
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function deleteLikeCard(cardUserId) {
  return fetch(`${URL}/cards/likes/${cardUserId}`, {
    method: 'DELETE',
    headers: {
      authorization: AUTHORIZATION,
    },
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export function updateProfileImg(profileImageURL) {
  return fetch(`${URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      authorization: AUTHORIZATION,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: profileImageURL
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

