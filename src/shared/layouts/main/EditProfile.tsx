import type { EditProfileSchemaData } from "@/features/profile/profile.schema";
import ProfileEditForm from "@/features/profile/ProfileEditForm";
import { Button } from "@/shared/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { editUserProfile } from "@/shared/slices/authSlice";
import fetchData from "@/shared/utils/fetch";
import { useState } from "react";

const EditProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  const onSubmit = async (payload: EditProfileSchemaData): Promise<void> => {
    const editProfile = async (): Promise<void> => {
      const formData = new FormData();

      formData.append("name", payload.name);
      formData.append("username", payload.username);
      formData.append("bio", payload.bio);

      let imageBuffer: string | undefined;
      if (payload.image) {
        formData.append("image", payload.image);
        imageBuffer = URL.createObjectURL(payload.image);
      }

      dispatch(editUserProfile({ ...payload, avatar: imageBuffer }));

      await fetchData({
        url: `${import.meta.env.VITE_API_URL}/api/users/${user?.id}`,
        options: {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      });
    };

    editProfile();

    setIsOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="rounded-full"
        onClick={() => setIsOpen(true)}
      >
        Edit Profile
      </Button>

      <ProfileEditForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default EditProfile;
