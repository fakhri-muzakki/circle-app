import * as v from "valibot";

export const EditProfileSchema = v.object({
  name: v.message(v.pipe(v.string(), v.minLength(5)), "Minimum 5 characters"),
  username: v.message(
    v.pipe(v.string(), v.minLength(5)),
    "Minimum 5 characters",
  ),
  bio: v.message(v.pipe(v.string(), v.minLength(5)), "Minimum 5 characters"),
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

export type EditProfileSchemaData = v.InferOutput<typeof EditProfileSchema>;
