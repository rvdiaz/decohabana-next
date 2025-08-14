import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-4">
              GOLDEN WHEELS
            </h3>
            <p className="text-gray-300 text-sm">
              Premium luxury transportation services with professional
              chauffeurs and an exceptional fleet of vehicles.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary-400">Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Airport Transfers</li>
              <li>Corporate Events</li>
              <li>Wedding Transportation</li>
              <li>Hourly Service</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary-400">Fleet</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Executive Sedans</li>
              <li>Luxury SUVs</li>
              <li>Stretch Limousines</li>
              <li>Party Buses</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-primary-400">Contact</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>+1 (786) 473-1737</p>
              <p>info@goldenwheelsprivatechauffeur.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Golden Wheels. All rights reserved. |</p>
        </div>
      </div>
    </footer>
  );
};
