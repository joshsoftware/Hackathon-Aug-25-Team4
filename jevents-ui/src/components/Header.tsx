import { Calendar, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_LOCALSTORAGE_KEY, USER_ROLES } from "@/constants/user";
import { resetLocalStorageData } from "@/lib/localStorage";
import { useUserData } from "@/context/user";

export default function Header() {
  const navigate = useNavigate();
  const { data, setUserData } = useUserData();

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();

    resetLocalStorageData(USER_LOCALSTORAGE_KEY);
    setUserData(null);

    // Navigating to Home Page
    navigate("/");
  };

  return (
    <header className="dashboard-nav sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Link to="/" className="flex gap-2">
                <Calendar className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold gradient-text">
                  JEvents
                </span>
              </Link>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              to="/events"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Events
            </Link>
            {data?.user?.role == USER_ROLES.ORGANIZER && (
              <Link
                to="/dashboard"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {data?.user?.role ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground"
                onClick={handleLogout}
              >
                Logout
              </Link>

              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-muted-foreground hover:text-foreground"
              >
                Login
              </Link>

              <Link to="/signup">Sign Up</Link>

              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
