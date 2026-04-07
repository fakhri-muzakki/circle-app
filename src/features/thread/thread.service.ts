import fetchData from "@/shared/utils/fetch";

export const toggleLikeService = async (threadId: string, token: string) => {
  await fetchData({
    url: "http://localhost:3000/api/likes",
    options: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({ threadId }),
    },
  });
};
