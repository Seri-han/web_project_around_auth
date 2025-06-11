// import { useContext } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function InfoTooltip({ isOpen, onClose, message, image, alt }) {
  if (!isOpen) return null;

  return (
    <div className="info__tooltip">
      <div className="info__tooltip-image">
        <img className="info__tooltip-img" src={image} alt={alt} />
      </div>
      <h2 className="info__paragraph">{message}</h2>
      <button
        aria-label="Close modal"
        className="popup__close"
        type="button"
        onClick={onClose}
      >
        x
      </button>
    </div>
  );
}
