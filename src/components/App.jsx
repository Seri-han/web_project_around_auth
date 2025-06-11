/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";
import api from "../utils/api.js";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Main from "../components/Main/Main.jsx";
import "../index.css";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import { checkToken } from "../utils/auth.js";
import InfoTooltip from './InfoTooltip/InfoTooltip.jsx';
import trueImg from '../assets/images/trueImg.svg';
import falseImg from '../assets/images/falseImg.svg';
import { register, login } from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [tooltipData, setTooltipData] = useState({ message: "", image: "", alt: "" });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  // const location = useLocation();

  // ------------ Comprueba el Token ------------
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((data) => {
          setLoggedIn(true);
          setUserEmail(data.data.email);
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  }, []);

  // ------------ Login ------------
  const handleLogin = ({email, password}) => {
    console.log("Login iniciado");
    login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        setUserEmail(email);
        showTooltip("¡Inicio de sesión exitoso!", trueImg, "Inicio exitoso");
        navigate("/");
      })
      .catch(() => {
        showTooltip("Error al iniciar sesión. Inténtalo de nuevo.", falseImg, "Error en inicio");
      });
  };

  // ------------ Registro ------------
  const handleRegister = ({email, password}) => {
    console.log("Registro iniciado");
    register(email, password)
      .then(() => {
        showTooltip("¡Registro exitoso! Ahora puedes iniciar sesión.", trueImg, "Registro exitoso");
        navigate("/signin");
      })
      .catch(() => {
        showTooltip("El registro ha fallado. Inténtalo nuevamente.", falseImg, "Error en registro");
      });
  };

  // ------------ Logout ------------
  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    navigate("/signin", { replace: true });
  }

  // ------------ Mostrar Tooltips ------------
  const showTooltip = (message, image, alt) => {
    setTooltipData({ message, image, alt });
    setIsTooltipOpen(true);
  };

  const closeTooltip = () => {
    setIsTooltipOpen(false);
  };

  // ------------ Actualizar perfil del usuario ------------
  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api
      .editUserInfo(data.name, data.about)
      .then((newData) => {
        setCurrentUser(newData);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  // ------------ Actualizar avatar ------------
  const handleUpdateAvatar = (data) => {
    setIsLoading(true);
    api
      .editAvatar(data)
      .then((newUser) => setCurrentUser(newUser))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  // ------------ Agregar tarjeta ------------
  const handleAddPlaceSubmit = (newCardData) => {
    setIsLoading(true);
    api
      .addCard(newCardData)
      .then((newCard) => {
        const validatedCard = {
          ...newCard,
          likes: Array.isArray(newCard.likes) ? newCard.likes : [],
        };
        setCards([validatedCard, ...cards]);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
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
    const isLiked = card.likes?.some((like) =>
      typeof like === "object"
        ? like._id === currentUser._id
        : like === currentUser._id
    );

    try {
      const newCard = await api.changeLikeCardStatus(card._id, !isLiked);
      const updatedCard = {
        ...newCard,
        likes: !isLiked
          ? [...card.likes, { _id: currentUser._id }]
          : card.likes.filter((like) =>
              typeof like === "object"
                ? like._id !== currentUser._id
                : like !== currentUser._id
            ),
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
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider
  value={{
    currentUser,
    setCurrentUser,
    handleUpdateUser,
    handleUpdateAvatar,
    isLoggedIn: loggedIn,
    setIsLoggedIn: setLoggedIn,
    userData: { email: userEmail },
  }}
>
        <Header handleLogout={handleLogout} userEmail={userEmail} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onAddPlace={handleAddPlaceSubmit}
                  isLoading={isLoading}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={<Register handleRegistration={handleRegister} />}
          />
          <Route
            path="/signin"
            element={
              <Login
                setLoggedIn={setLoggedIn}
                handleLogin={handleLogin}
                setUserEmail={setUserEmail}
                showTooltip={showTooltip}
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/" : "/signin"} />}
          />
        </Routes>

        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeTooltip}
          message={tooltipData.message}
          image={tooltipData.image}
          alt={tooltipData.alt}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
