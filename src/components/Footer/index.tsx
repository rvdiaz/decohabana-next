"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TermsAndConditions } from "../TermsAndConditions";

export const Footer = () => {
  const logo = "/logo.png";

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-700 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start justify-start">
            {/* Logo */}
            <div className="flex items-start">
              <Link
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"
              >
                <Image
                  className="w-42"
                  src={logo}
                  width={300}
                  height={400}
                  alt="golden wheels"
                />
              </Link>
            </div>
            <p className="text-gray-300 text-sm">
              Premium luxury transportation services with professional
              chauffeurs and an exceptional fleet of vehicles.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-center justify-start">
            <h4 className="font-semibold mb-4 text-primary-400">Services</h4>
            <ul className="space-y-2 md:mx-auto text-sm text-gray-300">
              <li>
                <button
                  onClick={() => scrollToSection("fleet")}
                  className="text-white hover:text-primary-400 transition-colors"
                >
                  Our Fleet
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-white hover:text-primary-400 transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("faq")}
                  className="text-white hover:text-primary-400 transition-colors"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-white hover:text-primary-400 transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start md:items-center justify-start">
            <h4 className="font-semibold mb-4 text-primary-400">Contact</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>+1 (786) 473-1737</p>
              <p>info@goldenwheelsprivatechauffeur.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 Golden Wheels. All rights reserved.</p>
          <TermsAndConditions />
        </div>
      </div>
    </footer>
  );
};
