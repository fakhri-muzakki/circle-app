import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { FieldDescription } from "@/shared/components/ui/field";
import { Textarea } from "@/shared/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { addTotalComments } from "@/shared/slices/threadSlice";
import type { CreateThreadRes } from "@/shared/types/apiResponse";
import fetchData from "@/shared/utils/fetch";
// import { useAppDispatch } from "@/shared/hooks/redux";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";

const CreateThreadSchema = v.object({
  content: v.message(v.pipe(v.string(), v.minLength(5)), "Minimal 5 karakter"),

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

const CreateThreadForm = ({ threadId }: { threadId: string }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
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
    formData.append("threadId", threadId);
    if (payload.image) {
      formData.append("image", payload.image);
    }

    await fetchData<CreateThreadRes>({
      url: `${import.meta.env.VITE_API_URL}/api/replies`,
      options: {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    });

    dispatch(addTotalComments({ threadId }));

    setPreview(null);
    reset();
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <>
      <form className="p-6 flex gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Avatar>
          <AvatarImage src={user?.avatar} />
          <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          {preview && (
            <div className="mt-4">
              <img
                src={preview}
                alt="Preview"
                className="max-h-60 rounded-xl object-cover border mb-4 "
              />
            </div>
          )}
          <Textarea
            {...register("content")}
            placeholder="What is happening?!"
            className="border-none focus-visible:ring-0 resize-none"
          />
          {errors.content?.message && (
            <FieldDescription className="text-red-700 pt-4">
              {errors.content.message}
            </FieldDescription>
          )}
          {errors.image?.message && (
            <FieldDescription className="text-red-700 pt-4">
              {errors.image.message}
            </FieldDescription>
          )}

          <div className="flex justify-between items-center mt-3">
            <input
              type="file"
              id="image"
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
              htmlFor="image"
              role="button"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
                className: "cursor-pointer",
              })}
            >
              <ImageIcon size={18} />
            </label>

            <Button className="rounded-full">Send</Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateThreadForm;
