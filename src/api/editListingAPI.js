import { BASE_URL } from "./baseURL";

export async function _deleteListing(id) {
  const result = await fetch(`${BASE_URL}/delete-listing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ deleteID: id }),
  });

  const data = await result.json();
  return data;
}

export async function _editHandler(formData) {
  const response = await fetch(`${BASE_URL}/update-listing`, {
    header: {
      "content-type": "multipart/form-data",
    },

    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data;
}
