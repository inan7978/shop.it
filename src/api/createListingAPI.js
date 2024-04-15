import { BASE_URL } from "./baseURL";

export async function _createListing(formData) {
  const response = await fetch(`${BASE_URL}/create-listing`, {
    header: {
      "content-type": "multipart/form-data",
    },
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data;
}
