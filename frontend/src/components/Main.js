import React from "react";
import Card from "../components/Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onDeleteCard,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="page__content content">
      <section className="profile content__profile">
        <div className="profile__edit-photo" onClick={onEditAvatar}>
          <div
            className="profile__avatar"
            id="photo"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
        </div>

        <div className="profile__info">
          <h1 id="header" className="profile__name">
            {currentUser.name}
          </h1>
          <button
            type="button"
            className="button profile__edit-button popup-open"
            title="Редактировать профиль"
            onClick={onEditProfile}
          />
          <p id="paragraph" className="profile__job">
            {currentUser.about}
          </p>
        </div>
        <button
          type="button"
          className="button profile__add-button add-open"
          title="Добавить фото"
          onClick={onAddPlace}
        />
      </section>
      <section className="content__cards cards">
        <ul className="cards__elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onDeleteCard={onDeleteCard}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
