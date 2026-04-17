import { useEffect, useState } from "react";
import FollowItem from "../../features/follow/FollowItem";
import type { Follow } from "@/shared/types";
import fetchData from "@/shared/utils/fetch";
import { useOutletContext, useParams } from "react-router";
import { useAppSelector } from "@/shared/hooks/redux";
import type { ToggleFollow } from "@/features/follow/FollowLayout";
import FollowNotFound from "./FollowNotFound";

const FollowersPage = () => {
  const [followers, setFollowers] = useState<Follow[]>([]);
  const { toggleFollow } = useOutletContext<{ toggleFollow: ToggleFollow }>();

  const { username } = useParams();
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    const getData = async (): Promise<void> => {
      const result = await fetchData<Follow[]>({
        url: `${import.meta.env.VITE_API_URL}/api/users/${username}/followers`,
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

export default FollowersPage;
