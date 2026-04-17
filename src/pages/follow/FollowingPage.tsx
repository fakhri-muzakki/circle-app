import { useEffect, useState } from "react";
import FollowItem from "../../features/follow/FollowItem";
import type { Follow } from "@/shared/types";
import fetchData from "@/shared/utils/fetch";
import { useOutletContext, useParams } from "react-router";
import { useAppSelector } from "@/shared/hooks/redux";
import type { ToggleFollow } from "@/features/follow/FollowLayout";
import FollowNotFound from "./FollowNotFound";

const FollowingPage = () => {
  const { username } = useParams();
  const { toggleFollow } = useOutletContext<{ toggleFollow: ToggleFollow }>();
  const token = useAppSelector((state) => state.auth.token);

  const [followers, setFollowers] = useState<Follow[]>([]);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      const result = await fetchData<Follow[]>({
        url: `${import.meta.env.VITE_API_URL}/api/users/${username}/following`,
        options: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      setFollowers(result.data);
    };

    getData();
  }, [username, token]);

  const handleToggleFollow = async (
    followerId: string,
    isFollowing: boolean,
  ): Promise<void> => {
    toggleFollow(followerId, isFollowing, () => {
      setFollowers((prev) =>
        prev.map((p) =>
          p.id === followerId ? { ...p, isFollowing: !isFollowing } : p,
        ),
      );
    });
  };

  return (
    <div className="p-6 space-y-4">
      {followers ? (
        followers.map(({ id, avatar, name, username, isFollowing }) => (
          <FollowItem
            key={id}
            id={id}
            avatar={avatar}
            name={name}
            username={username}
            isFollowing={isFollowing}
            toggleFollow={handleToggleFollow}
          />
        ))
      ) : (
        <FollowNotFound />
      )}
    </div>
  );
};

export default FollowingPage;
