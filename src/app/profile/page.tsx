"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomer } from "@/context/authProvider";
import { CustomerProfile } from "@/components/Profile/customerProfile";
import { CustomerBookings } from "@/components/Profile/customerBookings";
import { LogoutButton } from "@/components/CustomerAuthForms/widgets/logoutButton";

const ProfilePage: React.FC = () => {
  const { customer, loading } = useCustomer();
  const [activeTab, setActiveTab] = useState("bookings");
  const router = useRouter();

  useEffect(() => {
    if (!loading && !customer) {
      router.push("/");
    }
  }, [customer, loading]);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-20 md:pt-32 max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          {!loading && (
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">
              Welcome back, {customer?.name}!
            </h1>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl p-6">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("bookings")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "bookings"
                      ? "bg-yellow-400 text-black"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  My Bookings
                </button>
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "profile"
                      ? "bg-yellow-400 text-black"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  Profile
                </button>
                <div className="hidden md:block">
                  <LogoutButton />
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "bookings" && <CustomerBookings />}
            {activeTab === "profile" && <CustomerProfile />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
