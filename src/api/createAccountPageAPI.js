import { BASE_URL } from "./baseURL";

export async function _createUser(email, pass) {
  const result = await fetch(`${BASE_URL}/POST-NEW-USER`, {
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
