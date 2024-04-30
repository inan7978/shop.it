import { BASE_URL } from "./baseURL";

export async function _getItemDetails(itemId) {
  const response = await fetch(`${BASE_URL}/item-details-page/${itemId}`, {
    header: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export async function _addToCart(userId, itemId) {
  console.log(userId, itemId);
  const result = await fetch(`${BASE_URL}/add-to-cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: userId, item: itemId }),
  });

  const data = await result.json();
  return data;
}
