import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace, loading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="cards"
      isOpen={isOpen}
      onClose={onClose}
      buttonText={loading ? "Загрузка" : "Создать"}
      onSubmit={handleSubmit}
    >
      <input
        className="form__item form__item_type_city"
        type="text"
        name="name"
        placeholder="Название"
        value={name}
        required
        minLength="2"
        maxLength="30"
        id="cardname"
        onChange={handleChangeName}
      />
      <span
        className="form__item-error form__item-error_active"
        id="cardname-error"
      ></span>
      <input
        className="form__item form__item_type_link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        value={link}
        required
        id="link"
        onChange={handleChangeLink}
      />
      <span
        className="form__item-error form__item-error_active"
        id="link-error"
      ></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
