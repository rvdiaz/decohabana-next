"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  User,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  saveBookingData,
  getBookingData,
  saveUserData,
} from "@/lib/booking-storage";

const AccountPage: React.FC = () => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState(getBookingData());
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: bookingData.user?.name || "",
    email: bookingData.user?.email || "",
    phone: bookingData.user?.phone || "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const data = getBookingData();
    setBookingData(data);

    // Redirect if no booking data or car selection
    if (
      !data.from ||
      !data.to ||
      !data.date ||
      !data.time ||
      !data.selectedCar
    ) {
      router.push("/");
    }
  }, [router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (isSignUp && !formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (isSignUp && !formData.phone.trim())
      newErrors.phone = "Phone number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      };

      saveBookingData({ user: userData });
      saveUserData(userData);

      router.push("/booking/payment");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}

      {/* Sign In Form */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-gray-900 rounded-xl p-8">
          {/* Toggle Between Sign In and Sign Up */}
          <div className="flex mb-8 bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                !isSignUp
                  ? "bg-yellow-400 text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                isSignUp
                  ? "bg-yellow-400 text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <User className="inline w-4 h-4 mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${
                    errors.name ? "border-red-500" : "border-gray-600"
                  } text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                <Mail className="inline w-4 h-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${
                  errors.email ? "border-red-500" : "border-gray-600"
                } text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <Phone className="inline w-4 h-4 mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${
                    errors.phone ? "border-red-500" : "border-gray-600"
                  } text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                <Lock className="inline w-4 h-4 mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${
                    errors.password ? "border-red-500" : "border-gray-600"
                  } text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors pr-12`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <Lock className="inline w-4 h-4 mr-2" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-600"
                  } text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold py-4 px-6 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              {isSignUp ? "Create Account & Continue" : "Sign In & Continue"}
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </form>

          {!isSignUp && (
            <div className="mt-6 text-center">
              <a
                href="#"
                className="text-yellow-400 hover:text-yellow-300 text-sm"
              >
                Forgot your password?
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
