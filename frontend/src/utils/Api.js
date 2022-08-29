class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _handlePromiseErr(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  // получение данных пользователя
  getUserInfoFromApi() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        'Authorization': this._getToken(),
        'Content-Type': 'application/json'
    },
    }).then(this._handlePromiseErr);
  }
  // получение картинок
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        'Authorization': this._getToken(),
        'Content-Type': 'application/json'
    },
    }).then(this._handlePromiseErr);
  }

  //добавить нового пользователя
  addUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        'Authorization': this._getToken(),
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({ name: name, about: about }),
    }).then(this._handlePromiseErr);
  }

  //Добавить новую картинку.
  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        'Authorization': this._getToken(),
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({ name: name, link: link }),
    }).then(this._handlePromiseErr);
  }

  //добавить нового пользователя
  addUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Authorization': this._getToken(),
        'Content-Type': 'application/json'
    },
      body: JSON.stringify({ avatar: avatar }),
    }).then(this._handlePromiseErr);
  }

  //Удалить новую картинку.
  deleteNewCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': this._getToken(),
        'Content-Type': 'application/json'
    },
    }).then(this._handlePromiseErr);
  }

  //Добавить like картинке.
  changeLikeCardStatus(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        'Authorization': this._getToken(),
        'Content-Type': 'application/json'
    },
    }).then(this._handlePromiseErr);
  }

  //Удалить like картинки.
  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        'Authorization': this._getToken(),
        'Content-Type': 'application/json'
    },
    }).then(this._handlePromiseErr);
  }

  _getToken() {
    return `Bearer ${localStorage.getItem('jwt')}`;
}
}

export const api = new Api({
  baseUrl: "https://api.anna.mesto.students.nomoredomains.sbs",
});
