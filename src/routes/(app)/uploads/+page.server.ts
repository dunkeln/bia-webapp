import { PUBLIC_URL } from "$env/static/public"

export const load = async () => {
  const response = await fetch(`${PUBLIC_URL}/video/`);
  const data = await response.json();
  console.log(data);
  return data;
}
