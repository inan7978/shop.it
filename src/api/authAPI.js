import { BASE_URL } from "./baseURL";
import Cookies from "js-cookie";

export async function _logInUser(email, pass) {
  console.log("log in requested");

  const result = await fetch(`${BASE_URL}/GET-TOKEN`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailSearch: email,
      password: pass,
    }),
  });

  const data = await result.json();
  return data;
}

export async function _logOutUser(token) {
  // need to tell the server to discard the token as well not just delete from the browser
  console.log("log out requested.");
  Cookies.remove("user-token-shopit");

  const result = await fetch(`${BASE_URL}/DELETE-TOKEN/${token}`, {
    method: "DELETE",
  });

  const data = await result.json();
  return data;
}
