import { BASE_URL } from './settings';
import inputValidator from './inputValidator';

function apiFacade() {
  const validateInput = (information) => {
    return inputValidator(information)
  }

  const searchForLoans = (information) => {
    // Fetch here...
    const data = [
      {
        "uid": "911a1211-6940-4dcb-9a5f-54c5f9a2e430",
        "bankName": "Bankster",
        "initialPayment": information.amount,
        "interest": information.amount / 10000
      },
      {
        "uid": "911a1211-6940-4dcb-9a5f-54c5f9a2e430",
        "bankName": "DueBank",
        "initialPayment": information.amount,
        "interest": information.amount / 1000
      },
      {
        "uid": "911a1211-6940-4dcb-9a5f-54c5f9a2e430",
        "bankName": "JezperBank",
        "initialPayment": information.amount,
        "interest": information.amount / 100
      }
    ];
    return data;
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