import type { CurrentUser } from "@/pages/profile/ProfilePage";
import { Button } from "@/shared/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import ProfileEditForm from "./ProfileEditForm";
import fetchData from "@/shared/utils/fetch";
import { useParams } from "react-router";
import { useState } from "react";
import type { EditProfileSchemaData } from "./profile.schema";
import { updateFollowerCount } from "@/shared/slices/authSlice";

interface ProfileButtonProps {
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
  isFollowing: boolean;
}

const ProfileButton = ({
  setCurrentUser,
  currentUser,
  isFollowing,
}: ProfileButtonProps) => {
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const [isFollow, setIsFollow] = useState(isFollowing);
  const token = useAppSelector((state) => state.auth.token);

  if (!user) {
    throw new Error("Token invalid");
  }

  const toggleFollow = async (): Promise<void> => {
    if (isFollow) {
      await fetchData({
        url: `${import.meta.env.VITE_API_URL}/api/follows/${currentUser.id}`,
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
          method: "POST", // ✅ di luar headers
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            followerId: user?.id,
            followingId: currentUser.id,
          }),
        },
      });

      dispatch(updateFollowerCount("increment"));
    }

    setIsFollow((prev) => !prev);
  };

  const onSubmit = async ({
    bio,
    name,
    username,
    image,
  }: EditProfileSchemaData): Promise<void> => {
    let previewUrl;
    if (image) {
      previewUrl = URL.createObjectURL(image);
    }

    setCurrentUser({
      ...currentUser,
      bio,
      name,
      username,
      avatar: previewUrl ?? currentUser.avatar,
    });
  };

  return (
    <>
      {username === user.username ? (
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={() => setIsOpen(true)}
        >
          Edit Profile
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          className="rounded-full"
          onClick={toggleFollow}
        >
          {isFollow ? "Unfollow" : "Follow"}
        </Button>
      )}

      <ProfileEditForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ProfileButton;
