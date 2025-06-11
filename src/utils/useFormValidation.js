//Custom hook para validar FORMS con uso de useRef

import { useEffect, useState } from 'react';

const useFormValidation = (config, formRef) => {
  const [inputList, setInputList] = useState([]);
  const [buttonElement, setButtonElement] = useState(null);
  const [errors, setErrors] = useState({})
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const form = formRef.current;
    if (form) {
      setInputList(Array.from(form.querySelectorAll(config.inputSelector)));
      setButtonElement(form.querySelector(config.submitButtonSelector));
    }
  }, [config, formRef]);

  const showInputError = (inputElement, errorMessage) => {
    if (inputElement && inputElement.id) {
      const errorElement = formRef.current.querySelector(`.${inputElement.id}-error`);
      if (errorElement) {
        inputElement.classList.add(config.inputErrorClass);
        setErrors((state) => ({...state, [inputElement.id]:errorMessage}))
        errorElement.textContent = errorMessage;
        errorElement.classList.add(config.errorClass);
      }
    }
  };
  
  const hideInputError = (inputElement) => {
    if (inputElement && inputElement.id) {
      const errorElement = formRef.current.querySelector(`.${inputElement.id}-error`);
      if (errorElement) {
        inputElement.classList.remove(config.inputErrorClass);
        setErrors((state) => ({...state, [inputElement.id]:""}))
        errorElement.classList.remove(config.errorClass);
        errorElement.textContent = "";
      }
    }
  };
  

  const checkInputValidity = (inputElement) => {
    if (inputElement) {
      if (!inputElement.validity.valid) {
        showInputError(inputElement, inputElement.validationMessage);
      } else {
        hideInputError(inputElement);
      }
    }
  };

  const hasInvalidInput = () => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };

  const toggleButtonState = () => {
    if (buttonElement) {
      if (hasInvalidInput()) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.setAttribute("disabled", "");
      } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
      }
    }
  };

  useEffect(() => {
    const handleInput = (inputElement) => {
      return () => {
        checkInputValidity(inputElement);
        toggleButtonState();
      };
    };
  
    inputList.forEach((inputElement) => {
      const onInput = handleInput(inputElement);
      inputElement.addEventListener("input", onInput);
  
      // Guardar referencia para eliminar el event listener más tarde
      inputElement.onInput = onInput;
      setIsReady(true);
    });
  
    return () => {
      inputList.forEach((inputElement) => {
        const { onInput } = inputElement;
        inputElement.removeEventListener("input", onInput);
      });
    };
  }, [inputList]);
  

  const resetValidation = () => {
    inputList.forEach((inputElement) => {
      hideInputError(inputElement);
    });
    toggleButtonState();
  };

  return { resetValidation, errors, isReady };
};

export default useFormValidation;