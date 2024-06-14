import { BASE_URL } from "./baseURL";

export async function _loadDetails(token) {
  const result = await fetch(`${BASE_URL}/GET-LISTING-ITEMS`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return data;
}
