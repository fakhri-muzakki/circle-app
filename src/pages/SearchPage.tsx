import FollowItem from "@/features/follow/FollowItem";
import SearchInput from "@/features/search/SearchInput";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { updateFollowerCount } from "@/shared/slices/authSlice";
import type { Follow as User } from "@/shared/types";
import fetchData from "@/shared/utils/fetch";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

const SearchPage = () => {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    const getSearchUser = async (): Promise<void> => {
      const result = await fetchData<User[]>({
        url: `${import.meta.env.VITE_API_URL}/api/users/search?q=${query}`,
        options: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      setUsers(result.data);
    };

    if (query) {
      getSearchUser();
    }
  }, [token, query]);

  const toggleFollow = async (
    followerId: string,
    isFollowing: boolean,
  ): Promise<void> => {
    if (isFollowing) {
      await fetchData({
        url: `${import.meta.env.VITE_API_URL}/api/follows/${followerId}`,
        options: {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      dispatch(updateFollowerCount("decrement"));
    } else {
      await fetchData({
        url: `${import.meta.env.VITE_API_URL}/api/follows`,
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            followerId: user?.id,
            followingId: followerId,
          }),
        },
      });

      dispatch(updateFollowerCount("increment"));
    }

    setUsers((prev) =>
      prev.map((p) =>
        p.id === followerId ? { ...p, isFollowing: !isFollowing } : p,
      ),
    );
  };

  const handleClick = async (): Promise<void> => {
    if (inputRef.current?.value) {
      const query = inputRef.current.value;
      setSearchParams({ q: query });
    }
  };

  return (
    <div className="p-6">
      <SearchInput inputRef={inputRef} handleClick={handleClick} />

      <div className="space-y-3 ">
        {users.length ? (
          users.map(({ id, avatar, isFollowing, name, username }) => (
            <FollowItem
              key={id}
              id={id}
              avatar={avatar}
              isFollowing={isFollowing}
              name={name}
              username={username}
              toggleFollow={toggleFollow}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center ">
            <div className="text-2xl font-semibold">No users found</div>
            <p className="text-sm text-muted-foreground mt-2">
              Try searching for a different username or name.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
