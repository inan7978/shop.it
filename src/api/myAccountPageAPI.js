import { BASE_URL } from "./baseURL";

export async function _pushChanges(newVals) {
  const result = await fetch(`${BASE_URL}/update-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newVals),
  });

  const data = await result.json();

  return data;
}
