import { PUBLIC_URL } from "$env/static/public"

export const load = async () => {
  const response = await fetch(`${PUBLIC_URL}/video/`);
  const data = await response.json();
  data.videos = data.videos.map((values: Object) => ({
    video_id: values.video_id,
    button_trigger: `${PUBLIC_URL}/analyze-video/${values.video_id}`
  }));
  console.log(data);
  return data;
}
