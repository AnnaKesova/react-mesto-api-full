import React from "react";

function InfoTooltip({ isOpen, onClose, image, title }) {
  return (
    <div
      id="popup-error"
      className={`popup  popup-error ${isOpen && "popup_active"}`}
    >
      <div className="popup__body">
        <div className="popup-error__union">
          <img
            className="popup-error__image"
            src={image}
            alt="успех или отказ"
          />
          <h2 className="popup__heading popup-error__title">{title}</h2>
        </div>
        <button
          type="button"
          className="button popup__close "
          title="Закрыть"
          aria-label="Закрытие"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
