"use client";

import React, { useState } from "react";
import { Menu, X, Phone, Mail, User, LogOut } from "lucide-react";
import Link from "next/link";
import { useCustomer } from "@/context/authProvider";
import { LogoutButton } from "./CustomerAuthForms/widgets/logoutButton";

interface HeaderProps {
  onSignOut?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignOut }) => {
  const { customer } = useCustomer();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-yellow-400/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
            >
              PRESTIGE RIDES
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-yellow-400 transition-colors"
            >
              Home
            </Link>
            <button
              onClick={() => scrollToSection("fleet")}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              Our Fleet
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            {customer ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-yellow-400" />
                  <span className="text-white text-sm">
                    Welcome, {customer.name}
                  </span>
                </div>
                <Link
                  href="/dashboard"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Dashboard
                </Link>
                <LogoutButton />
              </div>
            ) : (
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <div className="flex items-center space-x-1">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="w-4 h-4" />
                  <span>info@prestigerides.com</span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-yellow-400 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-yellow-400/20">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white hover:text-yellow-400 transition-colors text-left"
              >
                Home
              </Link>
              <button
                onClick={() => scrollToSection("fleet")}
                className="text-white hover:text-yellow-400 transition-colors text-left"
              >
                Our Fleet
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-white hover:text-yellow-400 transition-colors text-left"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-white hover:text-yellow-400 transition-colors text-left"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-white hover:text-yellow-400 transition-colors text-left"
              >
                Contact
              </button>

              {customer ? (
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-yellow-400 text-sm mb-2">
                    Welcome, {customer.name}
                  </p>
                  <Link
                    href="/dashboard"
                    className="block text-gray-300 hover:text-white transition-colors mb-2"
                  >
                    Dashboard
                  </Link>
                  <LogoutButton />
                 
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-700 space-y-2 text-sm text-gray-300">
                  <div className="flex items-center space-x-1">
                    <Phone className="w-4 h-4" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span>info@prestigerides.com</span>
                  </div>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
