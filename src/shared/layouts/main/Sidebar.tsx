import {
  Home,
  Search,
  Heart,
  User,
  LogOut,
  Plus,
  // Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useAppDispatch } from "@/shared/hooks/redux";
import { logout } from "@/shared/slices/authSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  return (
    <aside className="w-64 h-screen border-r flex flex-col justify-between p-6">
      <div>
        <h1 className="text-2xl font-bold text-primary mb-8">Media</h1>

        <nav className="flex flex-col gap-2">
          <SidebarItem icon={<Home size={18} />} label="Home" active />
          <SidebarItem icon={<Search size={18} />} label="Search" />
          <SidebarItem icon={<Heart size={18} />} label="Follows" />
          <SidebarItem icon={<User size={18} />} label="Profile" />
        </nav>

        <Button className="mt-6 w-full rounded-full">
          <Plus size={16} />
          Create Post
        </Button>
      </div>

      <Button
        variant="ghost"
        className="justify-start text-muted-foreground"
        onClick={() => dispatch(logout())}
      >
        <LogOut size={16} />
        Logout
      </Button>
    </aside>
  );
};

export default Sidebar;

function SidebarItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className="justify-start gap-3"
    >
      {icon}
      {label}
    </Button>
  );
}
