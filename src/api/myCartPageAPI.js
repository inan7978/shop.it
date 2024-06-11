import { BASE_URL } from "./baseURL";

export async function _loadDetails(token) {
  const result = await fetch(`${BASE_URL}/GET-CART-ITEMS`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return data;
}

export async function _setQuantity(token, item, newQuantity) {
  const result = await fetch(`${BASE_URL}/PUT-ITEM-QUANTITY`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ item: item, newQuantity: newQuantity }),
  });

  const data = await result.json();
  return data;
}

export async function _deleteItem(user, item) {
  const result = await fetch(`${BASE_URL}/remove-from-cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: user, item: item }),
  });

  const data = await result.json();
  return data;
}
