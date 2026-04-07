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
      throw new Error(`Terjadi kesalahan pada saat hit end point : ${url}`);
    }

    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default fetchData;
