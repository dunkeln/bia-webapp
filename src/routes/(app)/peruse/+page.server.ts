import { PUBLIC_URL } from "$env/static/public"

export const load = async () => {
  const response = await fetch(`${PUBLIC_URL}/video/`);
  const { videos } = await response.json();
  const videoIds = videos.map(({ video_id }) => video_id);

  const analysisResults = await Promise.all(
    videoIds.map((videoid: string) =>
      fetch(`${PUBLIC_URL}/analyze-video/${videoid}`).then((res) => res.json())
    )
  );

  let resp = analysisResults.map(({ video_id, review, candidate_name }) => ({ id: video_id, file_name: candidate_name, ...review }));
  return {
    videos: resp
  };
};
