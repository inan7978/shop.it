import { BASE_URL } from "./baseURL";

export async function _loadDetails(user) {
  const result = await fetch(`${BASE_URL}/get-cart-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: user }),
  });

  const data = await result.json();
  return data;
}

export async function _setQuantity(user, item, newQuantity) {
  const result = await fetch(`${BASE_URL}/update-quantity`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: user, item: item, newQuantity: newQuantity }),
  });

  const data = await result.json();
  return data;
}
