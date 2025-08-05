"use client";

import React, { Suspense, useState } from "react";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";
import { useCustomer } from "@/context/authProvider";
import { usePathname, useRouter } from "next/navigation";
import TextButton from "../CodidgeUI/TextButton";
import { LogoutButton } from "../Auth/widgets/logoutButton";
import { LoginModal } from "../AuthModal";
import Image from "next/image";

interface HeaderProps {
  onSignOut?: () => void;
}

const Header: React.FC<HeaderProps> = () => {
  const { customer } = useCustomer();
  const pathname = usePathname();

  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  if (pathname.includes("booking")) {
    return;
  }

  const handleRegister = () => {
    setIsMenuOpen(false);
    router.push(`${pathname}?auth=register`);
  };

  const handleLogin = () => {
    setIsMenuOpen(false);
    router.push(`${pathname}?auth=login`);
  };

  const logo = "/logo.png";

  return (
    <header>
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-primary-400/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent"
              >
                <Image
                  className="w-42"
                  src={logo}
                  width={300}
                  height={400}
                  alt="ss"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-white hover:text-primary-400 transition-colors"
              >
                Home
              </Link>
              <button
                onClick={() => scrollToSection("fleet")}
                className="text-white hover:text-primary-400 transition-colors"
              >
                Our Fleet
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-white hover:text-primary-400 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-white hover:text-primary-400 transition-colors"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-white hover:text-primary-400 transition-colors"
              >
                Contact
              </button>
            </nav>

            {/* User Section */}
            <div className="hidden md:flex items-center space-x-4">
              {customer ? (
                <TextButton
                  onClick={() => {
                    router.push("/profile");
                  }}
                  className="flex items-center gap-2 bg-transparent hover:bg-gray-800 text-white hover:text-primary-500"
                >
                  <User size={24} />
                </TextButton>
              ) : (
                <div className="flex items-center space-x-4 text-sm text-gray-300">
                  <TextButton
                    onClick={handleLogin}
                    className="!text-white hover:!bg-transparent hover:!text-primary-500"
                  >
                    Login
                  </TextButton>
                  <TextButton
                    onClick={handleRegister}
                    className="!text-white hover:!bg-transparent hover:!text-primary-500"
                  >
                    Sign up
                  </TextButton>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white hover:text-primary-400 transition-colors"
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
            <div className="md:hidden py-4 border-t border-primary-400/20">
              <nav className="flex flex-col space-y-4">
                {/* <Link
                href="/"
                className="text-white hover:text-primary-400 transition-colors text-left"
              >
                Home
              </Link> */}
                <TextButton
                  className="flex items-center gap-2 bg-transparent hover:bg-gray-800 text-white hover:text-primary-500"
                  onClick={() => scrollToSection("fleet")}
                >
                  Home
                </TextButton>
                <TextButton
                  className="flex items-center gap-2 bg-transparent hover:bg-gray-800 text-white hover:text-primary-500"
                  onClick={() => scrollToSection("fleet")}
                >
                  Our Fleet
                </TextButton>
                <TextButton
                  className="flex items-center gap-2 bg-transparent hover:bg-gray-800 text-white hover:text-primary-500"
                  onClick={() => scrollToSection("services")}
                >
                  Services
                </TextButton>
                <TextButton
                  className="flex items-center gap-2 bg-transparent hover:bg-gray-800 text-white hover:text-primary-500"
                  onClick={() => scrollToSection("faq")}
                >
                  FAQ
                </TextButton>
                <TextButton
                  className="flex items-center gap-2 bg-transparent hover:bg-gray-800 text-white hover:text-primary-500"
                  onClick={() => scrollToSection("contact")}
                >
                  Contact
                </TextButton>

                {customer ? (
                  <div className="w-full pt-4 border-t border-gray-700 space-y-4">
                    <TextButton
                      onClick={() => {
                        router.push("/profile");
                      }}
                      className="w-full flex items-center gap-2 bg-transparent hover:bg-gray-800 text-white hover:text-primary-500"
                    >
                      <User size={18} />
                      <span>Profile</span>
                    </TextButton>
                    <LogoutButton className="w-full" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 items-center justify-between space-x-4 text-sm">
                    <TextButton
                      onClick={handleLogin}
                      className="!text-white border border-primary-500 hover:!bg-primary-600 hover:!text-white"
                    >
                      Login
                    </TextButton>
                    <TextButton
                      onClick={handleRegister}
                      className="!text-gray-800 bg-primary-500 hover:!bg-primary-600 hover:!text-gray-800"
                    >
                      Sign up
                    </TextButton>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </div>

      <Suspense>
        <LoginModal />
      </Suspense>
    </header>
  );
};

export default Header;
