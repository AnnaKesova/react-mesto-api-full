import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function PopupWithSubmit() {
  <PopupWithForm id="popup-confirm" className="popup confirm-popup">
    return (
    <div className="popup__body">
      <form className="form form-confirm">
        <h2 className="popup__heading confirm-popup__heading">Вы уверены?</h2>
        <button
          type="submit"
          className="button popup__save confirm-popup__yes"
          title="Согласие"
          aria-label="Согласиться"
        >
          Да
        </button>
      </form>
      <button
        type="button"
        className="button popup__close confirm-popup__close"
        title="Закрыть"
        aria-label="Закрытие"
      ></button>
    </div>
    );
  </PopupWithForm>;
}

export default PopupWithSubmit;
