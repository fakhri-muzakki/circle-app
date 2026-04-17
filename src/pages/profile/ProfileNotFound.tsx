import { Button } from "@/shared/components/ui/button";
import { UserX, ArrowLeft, Home, ChevronLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ProfileNotFound() {
  const navigate = useNavigate();
  const { username } = useParams();

  return (
    <>
      <div className="p-6 border-b sticky top-0 z-50 bg-background flex items-center gap-2">
        <Link to={"/"}>
          <ChevronLeft />
        </Link>
        <h2 className="text-lg font-semibold">{username}</h2>
      </div>
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-6">
        {/* Icon */}
        <div className="p-4 rounded-full bg-muted">
          <UserX className="w-10 h-10 text-muted-foreground" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold">@{username} tidak ditemukan</h2>

        {/* Description */}
        <p className="text-muted-foreground max-w-sm">
          Akun yang kamu cari mungkin tidak ada, sudah dihapus, atau username
          salah.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>

          <Button onClick={() => navigate("/")}>
            <Home className="w-4 h-4 mr-2" />
            Ke Beranda
          </Button>
        </div>
      </div>
    </>
  );
}
