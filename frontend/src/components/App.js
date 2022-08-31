import React, { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { api } from "../utils/Api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithSubmit from "./PopupWithSubmit";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute.js";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import succes from "../images/iconsuc.svg";
import refuse from "../images/Unionrefuse.svg";

import * as Auth from "../utils/Auth";

function App() {
  // получение API
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
  });
  const [cards, setCards] = useState([]);

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState({ image: "", title: "" });
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isEmail, setIsEmail] = useState("");

  // состояние для попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [renderLoading, setRenderLoading] = useState(false);

  // хранилище, проверка токена

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      Auth.getToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          navigate("/");
          setIsEmail(res.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [navigate]);

  // регистрация
  function handleRegister({ password, email }) {
    Auth.register(password, email)
      .then(() => {
        setInfoTooltipOpen(true);
        setIsInfoTooltip({
          image: succes,
          title: "Вы успешно зарегистрировались!",
        });
        navigate("/signin");
      })

      .catch((err) => {
        setInfoTooltipOpen(true);
        setIsInfoTooltip({
          image: refuse,
          title: "Что-то пошло не так! Попробуйте ещё раз.",
        });
        console.log(err);
      });
  }

  // вход, логин
  function handleLogin({ password, email }) {
    Auth.authorize(password, email)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function removeToken() {
    localStorage.removeItem("jwt");
    navigate("/signin");
  }

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfoFromApi()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // Отправляем запрос в API и получаем обновлённые данные карточки
      api
        .changeLikeCardStatus(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteNewCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // открытие попапов
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleSelectedCard(card) {
    setSelectedCard(card);
  }

  // закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser({ name, about }) {
    setRenderLoading(true);
    api
      .addUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setRenderLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setRenderLoading(true);
    api
      .addUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setRenderLoading(false));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setRenderLoading(true);
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setRenderLoading(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={isEmail} signOut={removeToken} />
        <Routes>
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          ></Route>
          <Route
            path="/signin"
            element={<Login onLogin={handleLogin} />}
          ></Route>
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                loggedIn={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleSelectedCard}
                cards={cards}
                onCardLike={handleCardLike}
                onDeleteCard={handleCardDelete}
              />
            }
          ></Route>
          <Route
            path="#"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
            }
          />
        </Routes>

        <Footer />
      </div>
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        loading={renderLoading}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        loading={renderLoading}
      />
      <PopupWithSubmit />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        loading={renderLoading}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        image={isInfoTooltip.image}
        title={isInfoTooltip.title}
      ></InfoTooltip>
    </CurrentUserContext.Provider>
  );
}

export default App;
