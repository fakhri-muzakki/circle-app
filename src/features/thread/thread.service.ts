import fetchData from "@/shared/utils/fetch";

export const toggleLikeService = async (threadId: string, token: string) => {
  await fetchData({
    url: `${import.meta.env.VITE_API_URL}/api/likes`,
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
