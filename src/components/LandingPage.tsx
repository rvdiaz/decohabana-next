"use server";

import React from "react";
import { Hero } from "./Hero";
import { GeneralServices } from "./GeneralServices";
import { Features } from "./Features";
import { FAQ } from "./Faq";
import { Footer } from "./Footer";
import { CarContainers } from "./Cars";
import { ContactPage } from "./Contact";
import SubscriberPopup from "./SubscriptionPopup";

const LandingPage: React.FC = () => {
  return (
    <div>
      <Hero />
      <CarContainers />
      <GeneralServices />
      <Features />
      <FAQ />
      <ContactPage />
      <Footer />
      <SubscriberPopup />
    </div>
  );
};

export default LandingPage;
