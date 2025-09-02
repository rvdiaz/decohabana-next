import { Award, Car, Shield } from "lucide-react";
import React from "react";

export const Features = () => {
  return (
    <div className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-primary-400">
          Why Choose Golden Wheels?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-opacity-5 rounded-xl border border-primary-400/20">
            <Shield className="w-16 h-16 text-primary-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">Safety First</h3>
            <p className="text-gray-300">
              Professional chauffeurs with extensive background checks and years
              of experience
            </p>
          </div>

          <div className="text-center p-8 bg-opacity-5 rounded-xl border border-primary-400/20">
            <Car className="w-16 h-16 text-primary-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">Premium Fleet</h3>
            <p className="text-gray-300">
              Luxury vehicles including limousines, SUVs, and executive sedans
            </p>
          </div>

          <div className="text-center p-8 bg-opacity-5 rounded-xl border border-primary-400/20">
            <Award className="w-16 h-16 text-primary-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">5-Star Service</h3>
            <p className="text-gray-300">
              Exceptional customer service with 24/7 support and concierge
              assistance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
