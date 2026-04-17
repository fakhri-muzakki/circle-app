import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { FieldDescription } from "@/shared/components/ui/field";
import { Textarea } from "@/shared/components/ui/textarea";
import { useAppSelector } from "@/shared/hooks/redux";
import type { CreateThreadRes } from "@/shared/types/apiResponse";
import fetchData from "@/shared/utils/fetch";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { ImageIcon, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as v from "valibot";

const CreateThreadSchema = v.object({
  content: v.message(
    v.pipe(v.string(), v.minLength(5)),
    "Minimum 5 characters",
  ),
  image: v.optional(
    v.pipe(
      v.blob(),
      v.mimeType(
        ["image/jpeg", "image/png", "image/webp"],
        "Please select a JPEG or PNG file.",
      ),
    ),
  ),
});

type CreateThreadData = v.InferOutput<typeof CreateThreadSchema>;

const CreateThreadButton = () => {
  const user = useAppSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const token = useAppSelector((state) => state.auth.token);
  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateThreadData>({
    resolver: valibotResolver(CreateThreadSchema),
  });

  useEffect(() => {
    setValue("image", undefined);
  }, [setValue]);

  const onSubmit = async (payload: CreateThreadData) => {
    const formData = new FormData();

    formData.append("content", payload.content);
    if (payload.image) formData.append("image", payload.image);

    await fetchData<CreateThreadRes>({
      url: `${import.meta.env.VITE_API_URL}/api/threads`,
      options: {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    });

    setPreview(null);
    setOpen(false);
    toast.success("created thread successfully");
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-6 w-full rounded-full">
          <Plus size={16} />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create thread</DialogTitle>
          <DialogDescription>
            {errors.image?.message && (
              <FieldDescription className="text-red-700 pt-4">
                {errors.image.message}
              </FieldDescription>
            )}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <Avatar>
              <AvatarImage src={user?.avatar} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Textarea
              {...register("content")}
              placeholder="What is happening?!"
              className="dark:bg-transparent border-none focus-visible:ring-0 resize-none"
            />
          </div>
          {errors.content?.message && (
            <FieldDescription className="text-red-700 pt-4 pl-10">
              {errors.content.message}
            </FieldDescription>
          )}
          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview"
                className="max-h-60 rounded-xl object-cover border mb-4 "
              />
            </div>
          )}
          <DialogFooter className="sm:justify-start ">
            <div className="flex items-center justify-between w-full">
              <input
                type="file"
                id="image2"
                placeholder=""
                className=""
                hidden
                {...register("image")}
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setValue("image", file);

                    const previewUrl = URL.createObjectURL(file);
                    setPreview(previewUrl);
                  }
                }}
              />
              <label
                htmlFor="image2"
                role="button"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                  className: "cursor-pointer",
                })}
              >
                <ImageIcon size={18} />
              </label>

              <Button className="rounded-full">Post</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateThreadButton;
