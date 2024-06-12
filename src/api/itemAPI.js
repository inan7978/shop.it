import { BASE_URL } from "./baseURL";

export async function _getItemDetails(itemId) {
  const response = await fetch(`${BASE_URL}/GET-ITEM-DETAILS/${itemId}`, {
    header: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export async function _addToCart(token, itemId) {
  console.log("Called add to cart");
  const result = await fetch(`${BASE_URL}/PUT-ITEM-CART`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ item: itemId }),
  });

  const data = await result.json();
  return data;
}
