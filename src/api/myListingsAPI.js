import { BASE_URL } from "./baseURL";

export async function _loadDetails(owner) {
  const result = await fetch(`${BASE_URL}/get-listing-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ owner: owner }),
  });

  const data = await result.json();
  return data;
}
