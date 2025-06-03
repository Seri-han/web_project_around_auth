import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

export default function EditProfile({ onClose }) {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  // useEffect(() => {
  //   if (currentUser) {
  //     setName(currentUser.name || "");
  //     setDescription(currentUser.about || "");
  //   }
  // }, [currentUser]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdateUser({ name, about: description });
    onClose();
  };

  const isFormValid =
    name.trim().length >= 2 &&
    description.trim().length >= 2;

  return (
    
    <div className="popup" id="popup__show">
      <form
        className="form popup__form"
        id="form-avatar"
        onSubmit={handleSubmit}
        noValidate
      >
        <h2 className="form__title">Editar perfil</h2>
        <input
          className="form__input"
          id="input-name"
          name="name"
          placeholder="Nombre"
          required
          type="text"
          minLength="2"
          maxLength="40"
          onChange={handleNameChange}
          value={name}
        />
        <span className="input-error input-name-error"></span>

        <input
          className="form__input"
          id="input-hobbie"
          name="about"
          placeholder="Acerca de mí"
          required
          type="text"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="input-error input-hobbie-error"></span>

        <button
          type="submit"
          className="form__submit"
          disabled={!isFormValid}
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
