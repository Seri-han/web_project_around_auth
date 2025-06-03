import { useState, useEffect } from "react";

export default function NewCard({ onAddPlace, onClose }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);


  useEffect(() => {
    const isValid = name.length >= 2 && name.length <=30 && link.startsWith('http');
    setIsFormValid(isValid);
  }, [name, link]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({ name, link });
    onClose();
  }

  return (
    
    <div className="popup" id="popup__show">
      <form
        className="form popup__form"
        id="form-addCard"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="form__title">Nuevo Lugar</h2>
        <input
          className="form__input"
          type="text"
          id="input-card-name"
          placeholder="Título"
          minLength="2"
          maxLength="30"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <span className="input-error input-card-name-error"></span>

        <input
          className="form__input"
          id="input-card-link"
          name="link"
          placeholder="Enlace de la imagen"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          type="url"
        />
        <span className="input-error input-card-link-error"></span>

        <button type="submit" className="form__submit"
        disabled={!isFormValid}
        >
          Crear
        </button>
      </form>
    </div>
  );
}
