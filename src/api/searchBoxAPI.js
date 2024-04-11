import { BASE_URL } from "./baseURL";

export async function _searchItem(search) {
  try {
    const response = await fetch(`${BASE_URL}/search-results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: search }),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    return "Error";
  }
}
