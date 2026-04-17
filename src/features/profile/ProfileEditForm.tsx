import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Textarea } from "@/shared/components/ui/textarea";
import { useAppSelector } from "@/shared/hooks/redux";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  EditProfileSchema,
  type EditProfileSchemaData,
} from "./profile.schema";

interface ProfileEditFormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (payload: EditProfileSchemaData) => Promise<void>;
}

const ProfileEditForm = ({
  isOpen,
  onSubmit,
  setIsOpen,
}: ProfileEditFormProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const [preview, setPreview] = useState(user?.avatar ?? "");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditProfileSchemaData>({
    resolver: valibotResolver(EditProfileSchema),
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-4 pb-0">
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Cover Image */}
          <div className="relative p-2">
            <div className="h-32 w-full bg-linear-to-r rounded-xl from-green-200 via-yellow-200 to-green-300" />

            {/* Avatar (overlap) */}
            <div className="absolute -bottom-10 left-4">
              <input
                type="file"
                className="hidden"
                id="image2"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setValue("image", file);
                    const previewUrl = URL.createObjectURL(file);
                    setPreview(previewUrl);
                  }
                }}
              />
              <label htmlFor="image2">
                <Avatar className="w-20 h-20 border-4 border-background">
                  <AvatarImage src={preview} />
                  <AvatarFallback>
                    {user?.username[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </label>
              {errors.image?.message && (
                <p className="text-red-700"> {errors.image.message} </p>
              )}
            </div>
          </div>

          {/* Form */}
          <div className="p-4 pt-12 space-y-4">
            {/* Name */}
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Name</label>
              <input
                type="text"
                {...register("name")}
                defaultValue={user?.name}
                className="w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.name?.message && (
                <p className="text-red-700"> {errors.name.message} </p>
              )}
            </div>

            {/* Username */}
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Username</label>
              <input
                type="text"
                {...register("username")}
                defaultValue={user?.username}
                className="w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
              {errors.username?.message && (
                <p className="text-red-700"> {errors.username.message} </p>
              )}
            </div>

            {/* Bio */}
            <div className="space-y-1">
              <label className="text-sm text-muted-foreground">Bio</label>
              <Textarea
                {...register("bio")}
                defaultValue={user?.bio}
                className="resize-none"
              />
              {errors.bio?.message && (
                <p className="text-red-700"> {errors.bio.message} </p>
              )}
            </div>

            {/* Button */}
            <div className="flex justify-end pt-2">
              <Button className="rounded-full px-6">Save</Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditForm;
