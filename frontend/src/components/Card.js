import React, {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onDeleteCard }) {
  const currentUser = useContext(CurrentUserContext);
  const handleClick = () => {
    onCardClick(card);
  };

  const handleCardLike = () => {
    onCardLike(card);
  };

  const handleCardDelete = () => {
    onDeleteCard(card);
  };

  // Определяем, являемся ли мы владельцем карточки
  const isOwn = card.owner === currentUser._id;

  // Создаём переменную  для кнопки удаления
  const cardDeleteButtonClassName = `photo__bin ${
    isOwn ? "photo__bin_active" : "photo__bin"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную,  для кнопки лайка
  const cardLikeButtonClassName = `photo__vector ${
    isLiked ? `photo__vector_active` : `photo__vector`
  }`;

  return (
    <li className="photo">
      <img
        src={card.link}
        className="photo__image"
        alt={card.name}
        onClick={handleClick}
      />
      <div className="photo__title">
        <h2 className="photo__text">{card.name}</h2>
        <div className="photo__group-like">
          <button
            type="button"
            className={cardLikeButtonClassName}
            title="Нравится"
            aria-label="Любимые картинки"
            onClick={handleCardLike}
          ></button>
          <span className="photo__numlike">{card.likes.length}</span>
        </div>
      </div>
      <button
        type="button"
        className={cardDeleteButtonClassName}
        title="Удаление"
        aria-label="Урна"
        onClick={handleCardDelete}
      ></button>
    </li>
  );
}

export default Card;
