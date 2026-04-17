import {
  Home,
  Search,
  Heart,
  User,
  LogOut,
  // Image as ImageIcon,
} from "lucide-react";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/redux";
import { logout } from "@/shared/slices/authSlice";
import { NavLink } from "react-router";
import CreateThreadButton from "./CreateThreadButton";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  if (!user) throw new Error("User not found");

  return (
    <aside className="w-64 h-screen border-r flex flex-col justify-between p-6">
      <div>
        <h1 className="text-2xl font-bold text-primary mb-8">Media</h1>

        <nav className="flex flex-col gap-2">
          <SidebarItem path="/" icon={<Home size={18} />} label="Home" />
          <SidebarItem
            path="/search"
            icon={<Search size={18} />}
            label="Search"
          />
          <SidebarItem
            path={`/${user.username}/following`}
            icon={<Heart size={18} />}
            label="Follows"
          />
          <SidebarItem
            path={`/${user.username}`}
            icon={<User size={18} />}
            label="Profile"
          />
        </nav>

        <CreateThreadButton />
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
  path,
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
  path: string;
}) {
  return (
    <NavLink
      to={path}
      end
      className={({ isActive }) =>
        buttonVariants({
          variant: isActive ? "secondary" : "ghost",
          className: "justify-start gap-3",
        })
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}
