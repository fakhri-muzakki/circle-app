// hooks/useUsers.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import type { APIResponse, Follow } from "../types";

const fetchUsers = async ({
  pageParam,
}: {
  pageParam: string | null;
}): Promise<APIResponse<Follow[]>> => {
  const params = new URLSearchParams({ limit: "10" });
  const token = localStorage.getItem("token");

  if (pageParam) params.set("cursor", pageParam);

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users?${params}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const useUsers = () => {
  return useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor, // null = stop fetching
  });
};
