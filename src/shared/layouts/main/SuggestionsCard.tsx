import { Card } from "@/shared/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import fetchData from "@/shared/utils/fetch";
import type { Follow } from "@/shared/types";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import FollowButton from "@/features/follow/FollowButton";
import { updateFollowerCount } from "@/shared/slices/authSlice";

const SuggestionsCard = () => {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<Follow[]>([]);
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    const getUsers = async (): Promise<void> => {
      const result = await fetchData<Follow[]>({
        url: `${import.meta.env.VITE_API_URL}/api/users?limit=4`,
        options: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });

      setUsers(result.data);
    };

    getUsers();
  }, [token]);

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

  return (
    <Card className="p-4">
      {/* Header */}
      <h3 className="font-semibold mb-4">Suggested for you</h3>

      {/* List */}
      <div className="space-y-4">
        {users?.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                  {user.username[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  @{user.username}
                </p>
              </div>
            </div>

            {/* <Button variant="outline" size="sm" className="rounded-full">
              Follow
            </Button> */}
            <FollowButton
              id={user.id}
              isFollowing={user.isFollowing}
              toggleFollow={toggleFollow}
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-border text-center">
        <Link
          to="/suggestions"
          className="text-sm font-medium text-primary hover:underline "
        >
          See more suggestions
        </Link>
      </div>
    </Card>
  );
};

export default SuggestionsCard;
