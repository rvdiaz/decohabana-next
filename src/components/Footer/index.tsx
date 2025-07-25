import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
              PRESTIGE RIDES
            </h3>
            <p className="text-gray-300 text-sm">
              Premium luxury transportation services with professional
              chauffeurs and an exceptional fleet of vehicles.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Services</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Airport Transfers</li>
              <li>Corporate Events</li>
              <li>Wedding Transportation</li>
              <li>Hourly Service</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Fleet</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Executive Sedans</li>
              <li>Luxury SUVs</li>
              <li>Stretch Limousines</li>
              <li>Party Buses</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Contact</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>+1 (555) 123-4567</p>
              <p>info@prestigerides.com</p>
              <p>
                123 Luxury Lane
                <br />
                Beverly Hills, CA 90210
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; 2024 Prestige Rides. All rights reserved. |
            <a href="#" className="text-yellow-400 hover:text-yellow-300 ml-1">
              Privacy Policy
            </a>{" "}
            |
            <a href="#" className="text-yellow-400 hover:text-yellow-300 ml-1">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
