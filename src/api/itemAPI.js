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
