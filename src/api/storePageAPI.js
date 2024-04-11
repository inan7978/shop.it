import { BASE_URL } from "./baseURL";

export async function _getRecords() {
  try {
    const response = await fetch(`${BASE_URL}/get-store-items`);
    const data = await response.json();
    return data;
  } catch (err) {
    return "Error";
  }
}
