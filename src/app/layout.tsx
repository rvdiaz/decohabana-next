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
  icons: {
    icon: "/assets/ico.png", // Must exist at /public/assets/logo_link.svg
  },
  openGraph: {
    title: "Prestige Rides - Luxury Car Rental with Chauffeur",
    description:
      "Premium luxury transportation services with professional chauffeurs and an exceptional fleet of vehicles.",
    url: "https://www.goldenwheelsprivatechauffeur.com",
    type: "website",
    siteName: "Prestige Rides - Luxury Car Rental with Chauffeur",
    images: [
      {
        url: "https://d6kk5owt2hjia.cloudfront.net/rentra/6ac91fcd-e2a7-4375-b42c-678abb4d73a3/booking/gallery/Golden Wheels Brand Kit-1754447344846.jpg",
        alt: "Prestige Rides - Luxury Car Rental with Chauffeur",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" type="image/svg+xml" href="/ico.png" />
      <body className={inter.className}>
        <AmplifyProvider>
          <AuthProvider>
            <div className="min-h-screen bg-black text-white">
              <Header />
              {children}
            </div>
          </AuthProvider>
        </AmplifyProvider>
        <ToastContainer position="bottom-right" />
      </body>
    </html>
  );
}
