import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import ProfileCard from "./ProfileCard";
import SuggestionsCard from "./SuggestionsCard";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex justify-between">
      {/* SIDEBAR */}
      <Sidebar />

      {/* CONTENT */}
      <main className="flex-1 border-r h-screen overflow-y-auto scrollbar-hide">
        <Outlet />
      </main>

      {/* RIGHT PANEL */}
      <aside className="w-80 p-6 hidden lg:block space-y-6">
        {/* PROFILE CARD */}
        <ProfileCard />

        {/* SUGGESTIONS */}
        <SuggestionsCard />

        <p className="text-xs text-muted-foreground">
          Developed by Fakhri muzakki · © 2026
        </p>
      </aside>
    </div>
  );
};

export default MainLayout;
