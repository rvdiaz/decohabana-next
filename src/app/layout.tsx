import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AmplifyProvider from "@/context/amplifyProvider";
import { AuthProvider } from "@/context/authProvider";
import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prestige Rides - Luxury Car Rental with Chauffeur",
  description:
    "Premium luxury transportation services with professional chauffeurs and an exceptional fleet of vehicles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AmplifyProvider>
          <AuthProvider>
            <div className="min-h-screen bg-black text-white">
              <Header />
              {children}
              <div className="fixed z-90 bottom-0 right-0">
                <ToastContainer position="bottom-right" />
              </div>
            </div>
          </AuthProvider>
        </AmplifyProvider>
      </body>
    </html>
  );
}
