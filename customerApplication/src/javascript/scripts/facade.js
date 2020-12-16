import axios from 'axios';
import { MY_BASE_URL } from './settings';
import inputValidator from './inputValidator';

function apiFacade() {
  const validateInput = (information) => {
    return inputValidator(information)
  }

  const searchForLoans = async (information) => {
    const body = {
      "cpr": information.cpr,
      "mail": information.mail,
      "type": information.loanType,
      "amount": information.amount,
      "currency": information.valuta
    };
    try {
      const res = await axios.post(MY_BASE_URL + "/loans", body);
      return res.data;
    } catch (e) {
      console.error(e);
    }
  }

  const sendMail = (information, loans) => {
    console.log("Mail 'has' been sent!", information, loans);
  }

  return {
    validateInput,
    searchForLoans,
    sendMail,
  }
}
const facade = apiFacade();
export default facade;