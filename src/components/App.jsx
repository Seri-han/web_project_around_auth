import React, { useEffect, useState } from "react";
import { api } from "../utils/api.js";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Main from "../components/Main/Main.jsx";
import "../index.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register/Register.jsx';
import Login from './Login/Login.jsx';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  // ------------ Actualizar perfil del usuario ------------
  const handleUpdateUser = (data) => {
    api
      .editUserInfo(data.name, data.about)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch(console.error);
  };

  // ------------ Actualizar avatar del usuario ------------
  const handleUpdateAvatar = (data) => {
    api
      .editAvatar(data)
      .then((newUser) => {
        setCurrentUser(newUser);
      })
      .catch((err) => {
        console.error(`Error al actualizar avatar: ${err}`);
      });
  };

  // ------------ Agregar nueva tarjeta ------------
  const handleAddPlaceSubmit = (newCardData) => {
    api
      .addCard(newCardData)
      .then((newCard) => {
        const validatedNewCard = {
          ...newCard,
          likes: Array.isArray(newCard.likes) ? newCard.likes : [],
        };
        setCards([validatedNewCard, ...cards]);
      })
      .catch((err) => console.error(`Error al añadir tarjeta: ${err}`));
  };

  // ------------ Cargar datos iniciales ------------
  useEffect(() => {
    api.getUserInfo().then(setCurrentUser).catch(console.error);

    api
      .getInitialCards()
      .then((cards) => {
        const validatedCards = cards.map((card) => ({
          ...card,
          likes: Array.isArray(card.likes) ? card.likes : [],
        }));
        setCards(validatedCards);
      })
      .catch(console.error);
  }, []);

  // ------------ Like a una tarjeta ------------
  const handleCardLike = async (card) => {
    const isLiked = Array.isArray(card.likes) && card.likes.some((i) => {
      const likeId = typeof i === "object" ? i._id : i;
      return likeId === currentUser._id;
    });

    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);

      const updatedCard = {
        ...newCard,
        likes: !isLiked
          ? [...card.likes, { _id: currentUser._id }]
          : card.likes.filter((like) => {
              const likeId = typeof like === "object" ? like._id : like;
              return likeId !== currentUser._id;
            }),
      };

      setCards((state) =>
        state.map((c) => (c._id === card._id ? updatedCard : c))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // ------------ Eliminar tarjeta ------------
  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error("Error al eliminar la tarjeta:", err));
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setCurrentUser,
          handleUpdateUser,
          handleUpdateAvatar,
        }}
      >
        <Header />
            <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute loggedIn={loggedIn}>
            <Main />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<Register setLoggedIn={setLoggedIn} />} />
      <Route path="/signin" element={<Login setLoggedIn={setLoggedIn} />} />
      <Route path="*" element={<Navigate to={loggedIn ? "/" : "/signin"} />} />
    </Routes>
        <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddPlace={handleAddPlaceSubmit}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
