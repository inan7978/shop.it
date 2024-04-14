import { BASE_URL } from "./baseURL";

export async function _loadDetails(toFind) {
  const result = await fetch(`${BASE_URL}/get-cart-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toFind),
  });

  const data = await result.json();
  return data;
}
