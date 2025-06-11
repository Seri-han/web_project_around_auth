const INPUT_CARD_NAME_MIN_LENGTH = 2;
const INPUT_CARD_NAME_MAX_LENGTH = 30;
const INPUT_USER_NAME_MIN_LENGTH = 2;
const INPUT_USER_NAME_MAX_LENGTH = 40;
const INPUT_USER_ABOUT_MAX_LENGTH = 200;

const validateInput = (input, errorMessages) => {
  const value = input.value.trim();
  let errorMessage = '';

  if (!value) {
    errorMessage = errorMessages.required;
  } else if (input.type === 'url' && !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value)) {
    errorMessage = errorMessages.url;
  } else if (value.length < INPUT_CARD_NAME_MIN_LENGTH) {
    errorMessage = errorMessages.minLength;
  } else if (value.length > INPUT_CARD_NAME_MAX_LENGTH) {
    errorMessage = errorMessages.maxLength;
  }

  return errorMessage;
};

export {
  INPUT_CARD_NAME_MIN_LENGTH,
  INPUT_CARD_NAME_MAX_LENGTH,
  INPUT_USER_NAME_MIN_LENGTH,
  INPUT_USER_NAME_MAX_LENGTH,
  INPUT_USER_ABOUT_MAX_LENGTH,
  validateInput,
};