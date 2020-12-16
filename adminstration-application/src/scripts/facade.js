import { BASE_URL } from "./settings";

const handleHttpErrors = (res) => {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
};

const makeOptions = (method, body) => {
  var opts = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "session-id": sessionStorage.getItem("session-id")
    },
  };
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
};

const facade = () => {
  const fetchWrapper = (url, method, body) => {
    const options = makeOptions(method, body);
    return fetch(BASE_URL + url, options).then(handleHttpErrors);
  };
  const login = (body) => {
    return fetchWrapper("/login", "POST", body);
  };
  const register = (body) => {
    return fetchWrapper("/create-user", "POST", body);
  };
  const latestLogs = () => {
    return fetchWrapper("/recent-logs", "GET");
  };
  const distributionOfLogins = () => {
    return fetchWrapper("/stats-login", "GET");
  };
  const distributionOfMicroservices = () => {
    return fetchWrapper("/stats-microservice", "GET");
  };
  return {
    login,
    register,
    latestLogs,
    distributionOfLogins,
    distributionOfMicroservices,
  };
};

const instance = facade();
export default instance;
