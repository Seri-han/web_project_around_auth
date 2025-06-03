import { useState, useContext } from "react";
import Popup from "../Main/components/Popup/Popup";
import NewCard from "../Main/components/Popup/NewCard/NewCard";
import EditProfile from "../Main/components/Popup/EditProfile/EditProfile";
import EditAvatar from "../Main/components/Popup/EditAvatar/EditAvatar";
import Card from "../Main/components/Card/Card";
import ImagePopup from "../Main/components/Popup/ImagePopup/ImagePopup";
import AddButton from "../../images/addButton.png";
import EditBtnAvatar from "../../images/edit_avatar.png";
import EditBtn from "../../images/editButton.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Main({ 
  cards, 
  onCardLike, 
  onCardDelete, 
  onAddPlace 
}) {
  const [popup, setPopup] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);


  function handleOpenPopup(type, card = null) {
    if (type === "image") {
      setPopup(<ImagePopup card={card} onClose={() => setPopup(null)} />);
    } else if (type === "newCard") {
      setPopup(<NewCard onClose={() => setPopup(null)} onAddPlace={onAddPlace} />);
    } else if (type === "editProfile") {
      setPopup(<EditProfile onClose={() => setPopup(null)} />);
    } else if (type === "editAvatar") {
      setPopup(<EditAvatar onClose={() => setPopup(null)} />);
    }
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar-container">
            <img
              className="profile__avatar"
              src={`${currentUser.avatar}?${new Date().getTime()}`}

              alt="Avatar"
              
              // onClick={() => onOpenPopup(editAvatarPopup)}
            />
         
          <button
            className="profile__edit-avatar"
            aria-label="Editar Avatar"
            onClick={() => handleOpenPopup("editAvatar")}
          >
            <img src={EditBtnAvatar} alt="Editar Avatar" />
          </button>
        </div>
        <div className="profile__content">
          <div className="profile__info">
          {currentUser.name ? (
      <>
        <p className="profile__name">{currentUser.name}</p>
        <p className="profile__hobbie">{currentUser.about}</p>
      </>
    ) : (
      <p>Cargando perfil...</p>
    )}
          </div>
          <button
            className="profile__edit-button"
            aria-label="Editar perfil"
            onClick={() => handleOpenPopup("editProfile")}
          >
            <img src={EditBtn} alt="Editar perfil" />
          </button>
        </div>
        <button
          className="profile__add-button"
          aria-label="Agregar nueva imagen"
          onClick={() => handleOpenPopup("newCard")}
        >
          <img src={AddButton} alt="Agregar imagen" />
        </button>
      </section>

      <ul className="elements__container">
      {cards.map((card) => {
 
  return (
    <Card
      key={card._id}
      card={card}
      onImageClick={() => handleOpenPopup("image", card)}
      onCardLike={onCardLike}
              onCardDelete={onCardDelete}
    />
  );
})}
      </ul>

      {popup && (
        <div className="popup__overlay">
          <div className="popup__content">
            <button
              className="popup__close"
              onClick={handleClosePopup}
              aria-label="Cerrar popup"
            >
              X
            </button>
            <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
            {popup}
          </div>
        </div>
      )}
    </main>
  );
}
