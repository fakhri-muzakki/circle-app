import { Button } from "@/shared/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom"; // kalau pakai react-router

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Code */}
        <h1 className="text-6xl font-bold tracking-tight">404</h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold">Halaman tidak ditemukan</h2>

        {/* Description */}
        <p className="text-muted-foreground">
          Maaf, halaman yang kamu cari tidak tersedia atau sudah dipindahkan.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>

          <Button onClick={() => navigate("/")}>Ke Beranda</Button>
        </div>
      </div>
    </div>
  );
}
