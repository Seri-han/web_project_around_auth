import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import errorMessages from "../../utils/errorMessages";
import Popup from "../Main/components/Popup/Popup";
import CurrentUserContext from '../../contexts/CurrentUserContext';


 const Register = ({ handleRegistration }) => {
  const [disabled, setDisabled] = useState(true);
  const [touchedFields, setTouchedFields] = useState({ email: false, password: false }); // Campos tocados
  const { 
    register, 
    handleSubmit, 
    watch, 
    setError, 
    clearErrors, 
    formState: { errors, isValid }, 
    trigger 
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const { popup, handleClosePopup } = useContext(CurrentUserContext);

  useEffect(() => {
    trigger();
  }, [trigger]);

  useEffect(() => {
    setDisabled(!isValid);
  }, [isValid]);

  const watchedValues = watch();

  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0;
    const hasEmptyFields = Object.values(watchedValues).some(
      (value) => value.trim() === ""
    );

    setDisabled(hasErrors || hasEmptyFields);
  }, [errors, watchedValues]);

  const handleValidation = (e) => {
    const input = e.target;
    const value = input.value.trim();
    let errorMessage = "";

    // Registrar que el campo fue "tocado"
    setTouchedFields((prev) => ({
      ...prev,
      [input.name]: true,
    }));

    if (!value) {
      errorMessage = errorMessages.required;
    } else if (input.type === "email" && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value)) {
      errorMessage = errorMessages.email;
    } else if (
      input.type === "password" &&
      (value.length < 6 || value.length > 20)
    ) {
      errorMessage =
        value.length < 6
          ? errorMessages.minLengthPassword
          : errorMessages.maxLengthPassword;
    }

    if (errorMessage) {
      setError(input.name, {
        type: "manual",
        message: errorMessage,
      });
    } else {
      clearErrors(input.name);
    }
  };

  const onSubmit = (data) => {
     console.log("Datos enviados:", data);
    handleRegistration(data);
  };

  return (
    <div className="register">
      <p className="register__welcome">Regístrate</p>
      <form className="register__form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <label className="register__label">
          <input
            id="email"
            className={`register__form-input ${
              errors.email && touchedFields.email ? "register__form-input_error" : ""
            }`}
            name="email"
            type="email"
            placeholder="Correo electrónico"
            {...register("email", {
              required: errorMessages.required,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                message: errorMessages.email,
              },
            })}
            onInput={handleValidation}
            onBlur={handleValidation}
          />
          {touchedFields.email && errors.email && (
            <span className="register__error">{errors.email.message}</span>
          )}
        </label>
        <label className="register__label">
          <input
            id="password"
            className={`register__form-input ${
              errors.password && touchedFields.password ? "register__form-input_error" : ""
            }`}
            name="password"
            type="password"
            placeholder="Contraseña"
            {...register("password", {
              required: errorMessages.required,
              minLength: {
                value: 6,
                message: errorMessages.minLengthPassword,
              },
              maxLength: {
                value: 20,
                message: errorMessages.maxLengthPassword,
              },
            })}
            onInput={handleValidation}
            onBlur={handleValidation}
          />
          {touchedFields.password && errors.password && (
            <span className="register__error">
              {errors.password.message}
            </span>
          )}
        </label>
        <button
          type="submit"
          className={`register__link ${disabled ? "register__link_disabled" : ""}`}
          disabled={disabled}
        >
          Regístrate
        </button>
      </form>
      <div className="register__signin">
        <p>¿Ya eres miembro?</p>
        <Link to="/signin" className="register__login-link">
          Inicia sesión aquí
        </Link>
      </div>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
          </Popup>
        )}
    </div>
  );
};

export default Register;