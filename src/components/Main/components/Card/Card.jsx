import { CurrentUserContext } from "../../../../contexts/CurrentUserContext";
import React, { useContext } from "react";

export default function Card({ card, onImageClick, onCardLike, onCardDelete }) {
  const {currentUser} = useContext(CurrentUserContext);
  
  // Si card.owner es un objeto o un string:
  const ownerId = typeof card.owner === "object" ? card.owner._id : card.owner;
  const isOwn = currentUser && ownerId === currentUser._id;
  // const isOwn = card.owner._id === currentUser._id;

  
  // Forzá que likes sea un array (vacío por defecto)
  const likes = Array.isArray(card.likes) ? card.likes : [];
  const isLiked = currentUser && likes.some((like) => {
    const likeId = typeof like === "object" && like !== null ? like._id : like;
    return likeId === currentUser._id;
  });

  const cardLikeButtonClassName = `element__photo-like ${
    isLiked ? "element__photo-like_active" : ""
  }`;

  // Simplificamos los manejadores usando card ya disponible
  const handleLikeClick = () => {
   
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <li className="element">
      {isOwn && (
        <button
          aria-label="Eliminar tarjeta"
          className="element__photo-trash"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="element__photo-link"
        src={card.link}
        alt={card.name || "Imagen de tarjeta"}
        onClick={() => onImageClick(card)}
      />
      <div className="element__info">
        <h2 className="element__photo-name">{card.name}</h2>
        <button
          aria-label="Dar like a la tarjeta"
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        />
        <span className="element__photo-like-count">{likes.length}</span>
      </div>
    </li>
  );
}
