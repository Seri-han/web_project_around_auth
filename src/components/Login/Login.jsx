import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import errorMessages from "../../utils/errorMessages";
import Popup from "../Main/components/Popup/Popup";
import CurrentUserContext from '../../contexts/CurrentUserContext';

const Login = ({ handleLogin }) => {
  const [disabled, setDisabled] = useState(true);
  const [touchedFields, setTouchedFields] = useState({ email: false, password: false });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

    const { popup, handleClosePopup } = useContext(CurrentUserContext);

  useEffect(() => {
    trigger(); // Ejecutar validaciones iniciales al cargar
  }, [trigger]);

  useEffect(() => {
    setDisabled(!isValid); // Deshabilitar el botón si el formulario no es válido
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

    // Marcar el campo como tocado
    setTouchedFields((prev) => ({
      ...prev,
      [input.name]: true,
    }));

    // Reglas de validación
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

    // Establecer error si existe
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
    // handleMessagePopup();
    handleLogin(data);
  };

  return (
    <div className="login">
      <h1 className="login__welcome">Inicia sesión</h1>
      <form className="login__form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <label className="login__label">
          <input
            id="email"
            className={`login__form-input ${
              errors.email && touchedFields.email ? "login__form-input_error" : ""
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
            <span className="login__error">{errors.email.message}</span>
          )}
        </label>
        <label className="login__label">
          <input
            id="password"
            className={`login__form-input ${
              errors.password && touchedFields.password ? "login__form-input_error" : ""
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
            <span className="login__error">
              {errors.password.message}
            </span>
          )}
        </label>
        <button
          type="submit"
          className={`login__link ${disabled ? "login__link_disabled" : ""}`}
          disabled={disabled}
        >
          Iniciar sesión
        </button>
      </form>
      <div className="login__signup">
        <p>¿Aún no eres miembro?</p>
        <Link to="/signup" className="login__register-link">
          Regístrate aquí
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

export default Login;