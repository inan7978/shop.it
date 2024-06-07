import { BASE_URL } from "./baseURL";

export async function _createListing(formData, token) {
  const response = await fetch(`${BASE_URL}/POST-LISTING`, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      // for whatever reason having content type set causes an error in sending files
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();
  return data;
}
