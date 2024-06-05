import { BASE_URL } from "./baseURL";

export default async function _isValid(toValidate) {
  const result = await fetch(`${BASE_URL}/GET-ISVALID`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${toValidate}`,
    },
  });

  const data = await result.json();
  return data;
}
