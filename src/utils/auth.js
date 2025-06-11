const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  }).then(checkResponse);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  }).then(checkResponse);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  }).then(checkResponse);
};

function checkResponse(res) {
    console.log("checkResponse ejecutado:", res.status);
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    console.log("Error desde API:", err);
    return Promise.reject(`Error ${res.status}: ${err.message}`);
  });
}