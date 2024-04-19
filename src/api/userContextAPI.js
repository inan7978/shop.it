import { BASE_URL } from "./baseURL";

export async function _loginUser(email, pass) {
  const result = await fetch(`${BASE_URL}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailSearch: email,
    }),
  });

  const data = await result.json();
  return data;
}

export async function _createUser(email, pass) {
  const result = await fetch(`${BASE_URL}/create-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      pass: pass,
    }),
  });

  const data = await result.json();
  return data;
}

export async function _updateCart(newCart, user) {
  const result = await fetch(`${BASE_URL}/update-cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userID: user._id, newCart: newCart }),
  });

  const data = await result.json();
  return data;
}
