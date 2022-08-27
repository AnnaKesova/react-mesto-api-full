function ImagePopup({ card, onClose }) {
  return (
    <div
      id="popup-image"
      className={`popup popup-image ${card && "popup_active"}`}
    >
      <div className="popup__content">
        <img
          className="popup__photo"
          src={card !== null ? card.link : ""}
          alt={card !== null ? card.name : ""}
        />
        <p className="popup__text">{card !== null ? card.name : ""}</p>
        <button
          type="button"
          className="button popup__close popup-image__close"
          title="Закрытие"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
