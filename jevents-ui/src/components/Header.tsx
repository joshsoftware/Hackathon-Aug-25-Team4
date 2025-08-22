import { Calendar, Menu, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="dashboard-nav sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold gradient-text">EventHub</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </a>
            <a
              href="/events"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Events
            </a>
            <a
              href="/dashboard"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </a>
            <a
              href="/organizer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              For Organizers
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-muted-foreground hover:text-foreground"
            >
              Login
            </Link>

            <Link to="/login">Sign Up</Link>

            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

