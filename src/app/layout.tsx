import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DecoHabanaUSA – Event Decoration & Event Planning in Naples, FL",
  description:
    "DecoHabanaUSA specializes in event decoration and event planning in Naples, Florida. From birthdays and weddings to corporate events and special celebrations, we transform your vision into a stunning experience.",
  icons: {
    icon: "/assets/ico.ico",
  },
  openGraph: {
    title: "DecoHabanaUSA – Event Decoration & Planning in Naples, FL",
    description:
      "Transform your next celebration with DecoHabanaUSA. Expert event decorators in Naples for birthdays, weddings, baby showers, corporate events, and more.",
    url: "https://www.decohabanausa.com",
    type: "website",
    siteName: "DecoHabanaUSA",
    images: [
      {
        url: "https://d6kk5owt2hjia.cloudfront.net/rentra/decohabana/DECOHABANA%202.jpg",
        alt: "DecoHabanaUSA Event Decoration – Naples Florida",
      },
    ],
  },
  keywords: [
    "event decoration Naples",
    "event planner Naples FL",
    "party decoration Naples Florida",
    "wedding decoration Naples",
    "birthday decoration Naples",
    "quinceañera decorations Naples",
    "corporate event decorations",
    "event services Naples",
    "DecoHabanaUSA",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <link rel="icon" type="image/svg+xml" href="/ico.ico" />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
