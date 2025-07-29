"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Phone,
  User,
  Settings,
  History,
  Star,
  ChevronRight,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    /* const userData = getUserData();
    if (!userData) {
      router.push("/");
    } else {
      setUser(userData);
    } */
  }, [router]);

  const handleSignOut = () => {
    setUser(null);
    router.push("/");
  };

  const handleStartBooking = () => {
    router.push("/");
  };

  // Mock data for demonstration
  const upcomingBookings = [
    {
      id: "PR-123456",
      date: "2024-01-15",
      time: "14:30",
      from: "LAX Airport",
      to: "Beverly Hills Hotel",
      vehicle: "Executive Sedan",
      status: "Confirmed",
      chauffeur: "James Wilson",
      chauffeurPhone: "+1 (555) 987-6543",
    },
    {
      id: "PR-123457",
      date: "2024-01-20",
      time: "19:00",
      from: "Downtown LA",
      to: "Hollywood Bowl",
      vehicle: "Stretch Limousine",
      status: "Confirmed",
      chauffeur: "Michael Chen",
      chauffeurPhone: "+1 (555) 876-5432",
    },
  ];

  const pastBookings = [
    {
      id: "PR-123450",
      date: "2024-01-05",
      time: "10:00",
      from: "Home",
      to: "Business District",
      vehicle: "Luxury SUV",
      status: "Completed",
      rating: 5,
      amount: "$240.00",
    },
    {
      id: "PR-123451",
      date: "2023-12-28",
      time: "20:30",
      from: "Restaurant",
      to: "Home",
      vehicle: "Executive Sedan",
      status: "Completed",
      rating: 5,
      amount: "$180.00",
    },
  ];

  const favoriteAddresses = [
    { name: "Home", address: "123 Sunset Blvd, Beverly Hills, CA 90210" },
    { name: "Office", address: "456 Business Ave, Downtown LA, CA 90013" },
    {
      name: "LAX Airport",
      address: "Los Angeles International Airport, CA 90045",
    },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-yellow-400">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleStartBooking}
            className="flex items-center justify-center p-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Booking
          </button>
          <button className="flex items-center justify-center p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <History className="w-5 h-5 mr-2" />
            View History
          </button>
          <button className="flex items-center justify-center p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Settings className="w-5 h-5 mr-2" />
            Account Settings
          </button>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-yellow-400">
          Upcoming Bookings
        </h3>
        {upcomingBookings.length > 0 ? (
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-black rounded-lg p-4 border border-gray-700"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-yellow-400">
                      Booking #{booking.id}
                    </p>
                    <p className="text-sm text-gray-300">{booking.vehicle}</p>
                  </div>
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                    {booking.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-yellow-400 mr-2" />
                      <span>
                        {booking.date} at {booking.time}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-yellow-400 mr-2" />
                      <span>
                        {booking.from} → {booking.to}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-yellow-400 mr-2" />
                      <span>Chauffeur: {booking.chauffeur}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-yellow-400 mr-2" />
                      <span>{booking.chauffeurPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No upcoming bookings</p>
        )}
      </div>

      {/* Favorite Addresses */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-yellow-400">
          Favorite Addresses
        </h3>
        <div className="space-y-3">
          {favoriteAddresses.map((address, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-black rounded-lg border border-gray-700"
            >
              <div>
                <p className="font-semibold">{address.name}</p>
                <p className="text-sm text-gray-400">{address.address}</p>
              </div>
              <button className="text-yellow-400 hover:text-yellow-300">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      {/* Upcoming Bookings */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-yellow-400">
          Upcoming Bookings
        </h3>
        {upcomingBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-black rounded-lg p-4 border border-gray-700 mb-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold text-yellow-400">
                  Booking #{booking.id}
                </p>
                <p className="text-sm text-gray-300">{booking.vehicle}</p>
              </div>
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                {booking.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-yellow-400 mr-2" />
                  <span>
                    {booking.date} at {booking.time}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-yellow-400 mr-2" />
                  <span>
                    {booking.from} → {booking.to}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <User className="w-4 h-4 text-yellow-400 mr-2" />
                  <span>Chauffeur: {booking.chauffeur}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-yellow-400 mr-2" />
                  <span>{booking.chauffeurPhone}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex space-x-3">
              <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm hover:bg-yellow-500 transition-colors">
                Modify Booking
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors">
                Cancel Booking
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Past Bookings */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-yellow-400">
          Past Bookings
        </h3>
        {pastBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-black rounded-lg p-4 border border-gray-700 mb-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold text-yellow-400">
                  Booking #{booking.id}
                </p>
                <p className="text-sm text-gray-300">{booking.vehicle}</p>
              </div>
              <div className="text-right">
                <span className="bg-gray-600 text-gray-300 px-3 py-1 rounded-full text-xs">
                  {booking.status}
                </span>
                <p className="text-sm text-gray-300 mt-1">{booking.amount}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-yellow-400 mr-2" />
                  <span>
                    {booking.date} at {booking.time}
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-yellow-400 mr-2" />
                  <span>
                    {booking.from} → {booking.to}
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span>Rating: </span>
                <div className="flex ml-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < booking.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg text-sm hover:bg-yellow-500 transition-colors">
                Book Again
              </button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors">
                Download Receipt
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-yellow-400">
          Profile Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              value={user?.name || ""}
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white"
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Phone
            </label>
            <input
              type="tel"
              value={user?.phone || ""}
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-600 text-white"
              readOnly
            />
          </div>
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/*  <Header isSignedIn={true} user={user} onSignOut={handleSignOut} /> */}

      <div className="pt-20 max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-300">
            Manage your bookings and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl p-6">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "overview"
                      ? "bg-yellow-400 text-black"
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  Overview
                </button>
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
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && renderOverview()}
            {activeTab === "bookings" && renderBookings()}
            {activeTab === "profile" && renderProfile()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
