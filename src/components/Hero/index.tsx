"use client";

import React, { useState } from "react";
import { Calendar, ChevronRight, Clock, MapPin } from "lucide-react";
import Input from "../CodidgeUI/InputField";
import { LoadScript } from "@react-google-maps/api";
import { PlacesAutoCompleteWidget } from "../CodidgeUI/PlacesAutoComplete";
import PrimaryButton, { ButtonSize } from "../CodidgeUI/PrimaryButton";

export const Hero = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const [loading, setLoading] = useState(false);

  const googleKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(":::dfdf");
    setLoading(true);

    // Simulate delay for loading performance
    setTimeout(() => {
      setLoading(false);
      console.log("Form submitted"); // replace with actual submit logic
    }, 2000); // 2 seconds delay
  };

  return (
    <LoadScript googleMapsApiKey={googleKey} libraries={["places"]}>
      <div
        id="home"
        className="relative h-screen flex items-center justify-center"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/assets/header.jpg)",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            Golden Wheels Private Chauffeur
          </h1>
          <p className="text-xl md:text-xl mb-8 text-gray-300">
            Luxury Chauffeur Service • Premium Vehicles • Exceptional Experience
          </p>

          {/* Booking Form */}
          <div className="bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-yellow-400/20">
            <h2 className="text-2xl font-semibold mb-6 text-yellow-400">
              Book Your Luxury Ride
            </h2>
            <div className="flex w-1/3 m-auto mb-8 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  !isSignUp
                    ? "bg-yellow-400 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                One Trip
              </button>
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  isSignUp
                    ? "bg-yellow-400 text-black"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                By Hour
              </button>
            </div>
            <div onSubmit={() => {}} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <PlacesAutoCompleteWidget
                    label="Pickup Location"
                    placeholder="Enter pickup address"
                    initialValue={""}
                    onChange={() => {}}
                  />

                  {/*    {errors.from && (
                  <p className="text-red-400 text-sm mt-1">{errors.from}</p>
                )} */}
                </div>

                <div>
                  <PlacesAutoCompleteWidget
                    label="Destination"
                    placeholder="Enter destination address"
                    initialValue={""}
                    onChange={() => {}}
                  />

                  {/*   {errors.to && (
                  <p className="text-red-400 text-sm mt-1">{errors.to}</p>
                )} */}
                </div>

                <div>
                  <Input
                    rightIcon={<Calendar className="text-white" size={18} />}
                    label="Pick Up Date"
                    type="datetime-local"
                  />

                  {/*    {errors.date && (
                  <p className="text-red-400 text-sm mt-1">{errors.date}</p>
                )} */}
                </div>
              </div>

              <PrimaryButton
                onClick={handleSubmit}
                loading={loading}
                size={ButtonSize.LARGE}
                className="flex items-center justify-center"
              >
                Find Your Perfect Ride
                <ChevronRight className="ml-2 w-5 h-5" />
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </LoadScript>
  );
};
