import { BASE_URL } from "./baseURL";

export async function _deleteListing(id, token) {
  const result = await fetch(`${BASE_URL}/DELETE-LISTING`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ deleteID: id }),
  });

  const data = await result.json();
  return data;
}

export async function _editHandler(formData, token) {
  const response = await fetch(`${BASE_URL}/PUT-LISTING`, {
    headers: {
      // content type form data addition would make this not work... still not sure why
      Authorization: `Bearer ${token}`,
    },

    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data;
}
