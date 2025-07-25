import { Car, Clock, Star, Users } from "lucide-react";
import React from "react";

export const GeneralServices = () => {
  return (
    <div id="services" className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-yellow-400">
            Our Services
          </h2>
          <p className="text-xl text-gray-300">
            Premium transportation solutions for every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-gray-900 rounded-xl border border-gray-700">
            <Car className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Airport Transfers</h3>
            <p className="text-gray-300 text-sm">
              Reliable and punctual airport transportation with flight
              monitoring
            </p>
          </div>

          <div className="text-center p-6 bg-gray-900 rounded-xl border border-gray-700">
            <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Corporate Events</h3>
            <p className="text-gray-300 text-sm">
              Professional transportation for business meetings and corporate
              functions
            </p>
          </div>

          <div className="text-center p-6 bg-gray-900 rounded-xl border border-gray-700">
            <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Special Occasions</h3>
            <p className="text-gray-300 text-sm">
              Weddings, proms, anniversaries, and other memorable celebrations
            </p>
          </div>

          <div className="text-center p-6 bg-gray-900 rounded-xl border border-gray-700">
            <Clock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Hourly Service</h3>
            <p className="text-gray-300 text-sm">
              Flexible hourly rentals for shopping, tours, or multiple stops
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
