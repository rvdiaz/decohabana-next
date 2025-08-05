"use client";

import React from "react";
import { BookingForm } from "./bookingForm";
import Image from "next/image";

export const Hero = () => {
  return (
    <div
      id="home"
      className="relative min-h-screen flex items-center justify-center py-16 sm:py-28 md:py-32"
    >
      <div className="absolute inset-0 bg-none sm:bg-[url('/assets/header.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto sm:px-4">
        <Image
          width={1920}
          height={1080}
          className="block sm:hidden"
          src="/assets/header.jpg"
          alt="Golden wheel"
        />
        <h1 className="text-2xl md:text-5xl font-bold mt-8 sm:mt-0 mb-6 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          Golden Wheels Private Chauffeur
        </h1>
        <p className="text-base md:text-xl mb-8 text-gray-300">
          Luxury Chauffeur Service • Premium Vehicles • Exceptional Experience
        </p>

        {/* Booking Form */}
        <div className="max-w-lg mx-auto bg-opacity-10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-primary-400/20">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-primary-500">
            Book Your Luxury Ride
          </h2>

          <BookingForm />
        </div>
      </div>
    </div>
  );
};
