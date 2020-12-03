import { BASE_URL } from './settings';
import inputValidator from './inputValidator';

function apiFacade() {
  const validateInput = (information) => {
    return inputValidator(information)
  }

  return {
    validateInput,
  }
}
const facade = apiFacade();
export default facade;