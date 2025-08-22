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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { USER_LOALSTORAGE_KEY, USER_ROLES, UserRole } from "@/constants/user";
import { SignUpRequest, UserLocalStorage } from "@/types/auth";
import { setLocalStorage } from "@/lib/localStorage";
import { signup } from "@/api/auth";
import { useUserRole } from "@/context/user";

export default function Signup() {
  const navigate = useNavigate();
  const { setRole } = useUserRole();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: USER_ROLES.ATTENDEE as UserRole,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (value: UserRole) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const body: SignUpRequest = {
      user: {
        name: formData.name,
        email: formData.name,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        role: formData.role,
      },
    };

    try {
      const data = await signup(body);
      setLocalStorage<UserLocalStorage>(USER_LOALSTORAGE_KEY, {
        token: data.token,
        user: data.user,
      });

      setRole(data.user.role);

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
              <Calendar className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold gradient-text">EventHub</span>
            </Link>
          </div>
        </div>

        <Card className="border-elegant shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl gradient-text">
              Create Account
            </CardTitle>
            <CardDescription>
              Join EventHub to discover amazing events and manage your bookings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4" onSubmit={handleSignUp}>
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="transition-smooth focus:border-primary"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  className="transition-smooth focus:border-primary"
                />
              </div>

              {/* Role */}
              <div className="space-y-3">
                <Label>Account Type</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={handleRoleChange}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={USER_ROLES.ATTENDEE} id="attendee" />
                    <Label htmlFor="attendee" className="font-normal">
                      Event Attendee - Discover and book events
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={USER_ROLES.ORGANIZER}
                      id="organizer"
                    />
                    <Label htmlFor="organizer" className="font-normal">
                      Event Organizer - Create and manage events
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className="transition-smooth focus:border-primary pr-10"
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

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="password_confirmation"
                    name="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="transition-smooth focus:border-primary pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Submit */}
              <Button type="submit" className="w-full btn-hero">
                Create Account
              </Button>
            </form>

            <div className="text-center">
              <span className="text-muted-foreground">
                Already have an account?{" "}
              </span>

              <Link
                to="/login"
                className="text-primary hover:text-primary/80 transition-smooth font-medium"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
