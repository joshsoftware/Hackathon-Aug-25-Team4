import { useState } from "react";
import { Calendar, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/api/auth";
import { LoginRequest, UserLocalStorage } from "@/types/auth";
import { USER_LOCALSTORAGE_KEY } from "@/constants/user";
import { setLocalStorage } from "@/lib/localStorage";
import { useUserData } from "@/context/user";

export default function Login() {
  const navigate = useNavigate();
  const { setUserData } = useUserData();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const body: LoginRequest = {
      email: email,
      password: password,
    };

    try {
      const data = await login(body);
      setUserData(data);

      navigate("/");
    } catch (error) {
      console.error("User Login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex gap-2">
              <span className="text-2xl font-bold gradient-text">JEvents</span>
            </Link>
          </div>
        </div>

        <Card className="border-elegant shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl gradient-text">
              Welcome Back
            </CardTitle>
            <CardDescription>
              Sign in to your account to manage events and bookings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="transition-smooth focus:border-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="transition-smooth focus:border-primary pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary/80 transition-smooth"
                >
                  Forgot password?
                </a>
              </div>

              <Button className="w-full btn-hero" onClick={handleSignIn}>
                Sign In
              </Button>
            </form>

            <div className="text-center">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
              </span>

              <Link
                to="/signup"
                className="text-primary hover:text-primary/80 transition-smooth font-medium"
              >
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
