import { Button } from "@/shared/components/ui/button";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import {
  useNavigate,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();

  const title = "Terjadi kesalahan";
  let message = "Maaf, terjadi error yang tidak terduga.";
  let status: number | null = null;

  // ✅ Handle error dari React Router (loader/action)
  if (isRouteErrorResponse(error)) {
    status = error.status;
    message = error.statusText || message;
  }

  // ✅ Handle error biasa (throw new Error)
  else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-muted">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
        </div>

        {/* Status Code (optional) */}
        {status && (
          <p className="text-sm text-muted-foreground">Error {status}</p>
        )}

        {/* Title */}
        <h1 className="text-2xl font-semibold">{title}</h1>

        {/* Message */}
        <p className="text-muted-foreground">{message}</p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>

          <Button onClick={() => navigate("/")}>
            <Home className="w-4 h-4 mr-2" />
            Ke Beranda
          </Button>
        </div>
      </div>
    </div>
  );
}
