import type { APIResponse } from "../types";

const fetchData = async <T>({
  url,
  options,
}: {
  url: string;
  options?: RequestInit;
}): Promise<APIResponse<T>> => {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      if (res.status === 401) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        window.location.replace("/login");

        throw new Error("Unauthorized");
      }

      if (res.status >= 500) {
        throw new Error("Internal server error");
      }

      const errorJson = await res.json();

      throw new Error(errorJson.message || "Request failed");
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default fetchData;
