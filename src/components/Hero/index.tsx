"use client";

import React from "react";
import { BookingForm } from "./bookingForm";

export const Hero = () => {
  return (
    <div
      id="home"
      className="relative min-h-screen flex items-center justify-center py-32"
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
        <div className="max-w-lg mx-auto bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-yellow-400/20">
          <h2 className="text-2xl font-semibold mb-6 text-yellow-400">
            Book Your Luxury Ride
          </h2>

          <BookingForm />
        </div>
      </div>
    </div>
  );
};
