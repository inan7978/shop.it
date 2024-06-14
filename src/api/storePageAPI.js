import { BASE_URL } from "./baseURL";

export async function _getRecords() {
  const response = await fetch(`${BASE_URL}/GET-STORE-ITEMS`);
  const data = await response.json();
  return data;
}
