import { Button } from "@/shared/components/ui/button";
import { UserX, ArrowLeft, Home } from "lucide-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function FollowNotFound() {
  const navigate = useNavigate();
  const { username } = useParams();
  const { pathname } = useLocation();

  const page = pathname.includes("/followers") ? "Followers" : "Following";
  const message =
    page === "Followers"
      ? `@${username} doesn't have any followers yet`
      : `${username} has not followed anyone yet`;

  return (
    <>
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center space-y-6">
        {/* Icon */}
        <div className="p-4 rounded-full bg-muted">
          <UserX className="w-10 h-10 text-muted-foreground" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold">{page} is not found</h2>

        {/* Description */}
        <p className="text-muted-foreground max-w-sm">{message}</p>

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
