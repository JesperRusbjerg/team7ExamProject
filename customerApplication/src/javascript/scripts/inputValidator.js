const validateNumberBetween = (number, min, max) => {
  return number >= min && number <= max;
};

const validateCPR = (cpr) => {
  if (!isNaN(cpr) && !isNaN(parseFloat(cpr))) {
    if (cpr.length === 10) {
      const day = cpr.substring(0, 2);
      const month = cpr.substring(2, 4);
      const year = cpr.substring(4, 6);
      if (validateNumberBetween(day, 1, 31) && validateNumberBetween(month, 1, 12) && validateNumberBetween(year, 0, 99)) {
        return '';
      }
    }
  }
  return 'The CPR is not valid!';
};

const validateMail = (mail) => {
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
    return '';
  }
  return 'The Mail is not valid!';
};

const validateAmount = (amount) => {
  if (!isNaN(amount) && !isNaN(parseFloat(amount))) {
    if (parseInt(amount) > 0) {
      return '';
    }
  }
  return 'The Amount is not valid!';
};

const checkResult = (result) => {
  return !(checkErrorMessage(result.errorMessageCPR)
    && checkErrorMessage(result.errorMessageMail)
    && checkErrorMessage(result.errorMessageAmount));
};

const checkErrorMessage = (errorMessage) => {
  return errorMessage ? true : false;
};

const inputValidator = (information) => {
  const result = {
    validation: false,
    errorMessageCPR: validateCPR(information.cpr),
    errorMessageMail: validateMail(information.mail),
    errorMessageAmount: validateAmount(information.amount),
  };
  result.validation = checkResult(result);
  return result;
};

export default inputValidator;