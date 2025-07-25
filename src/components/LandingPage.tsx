import React from "react";
import { Contact } from "lucide-react";
import Header from "./Header";
import { Hero } from "./Hero";
import { GeneralServices } from "./GeneralServices";
import { Features } from "./Features";
import { FAQ } from "./Faq";
import { Footer } from "./Footer";
import { CarContainers } from "./Cars";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <CarContainers />
      <GeneralServices />
      <Features />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage;
