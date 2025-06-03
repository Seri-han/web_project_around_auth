import { useRef, useContext } from "react";
import { CurrentUserContext } from "../../../../../contexts/CurrentUserContext";

export default function EditAvatar({ onClose }) {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const avatar = inputRef.current.value;
    if (avatar) {
      handleUpdateAvatar({ avatar });
      onClose();
    }
  };

  return (
    <form
      className="form popup__form"
      id="form-avatar"
      onSubmit={handleSubmit}
      noValidate
    >
      <h2 className="form__title">Editar Avatar</h2>
      <input
        className="form__input"
        id="input-avatar-url"
        name="avatar"
        placeholder="URL de la imagen"
        required
        type="url"
        ref={inputRef}
      />
      <span className="input-error input-avatar-error"></span>

      <button type="submit" className="form__submit">
        Guardar
      </button>
    </form>
  );
}
