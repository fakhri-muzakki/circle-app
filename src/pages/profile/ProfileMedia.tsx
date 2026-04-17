import { useOutletContext } from "react-router";
import { ImageOff } from "lucide-react";

const ProfileMedia = () => {
  const { images } = useOutletContext<{ images: string[] }>();

  // ✅ Empty state
  if (!images || images.length === 0) {
    return (
      <div className="px-3 py-16 flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 rounded-full bg-muted">
          <ImageOff className="w-8 h-8 text-muted-foreground" />
        </div>

        <h3 className="text-sm font-medium">Belum ada media</h3>

        <p className="text-sm text-muted-foreground max-w-xs">
          Pengguna ini belum membagikan foto atau media apapun.
        </p>
      </div>
    );
  }

  // ✅ Normal state
  return (
    <div className="px-3 pb-3 grid grid-cols-3 gap-2">
      {images.map((image) => (
        <img
          key={image}
          src={image}
          className="w-full aspect-square object-cover rounded-lg border border-border"
        />
      ))}
    </div>
  );
};

export default ProfileMedia;
