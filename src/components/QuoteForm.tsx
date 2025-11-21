"use client";

import { useState } from "react";
import FormHeader from "./form-components/FormHeader";
import FormEventDetails from "./form-components/FormEventDetails";
import FormProducts from "./form-components/FormProducts";
import FormPreferences from "./form-components/FormPreferences";
import FormContact from "./form-components/FormContact";
import FormReview from "./form-components/FormReview";
import FormFooter from "./form-components/FormFooter";
import { steps } from "@/core/steps";

export type FormData = {
  // Step 1: Event Details
  eventType: string;
  eventDate: string;
  eventTime: string;
  guestCount: string;
  venue: string;
  venueAddress: string;

  // Step 2: Services & Products
  services: string[];
  products: string[];
  specialRequests: string;

  // Step 3: Budget & Preferences
  budgetRange: string;
  style: string;
  colorScheme: string;
  inspiration: string;

  // Step 4: Contact Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  preferredContact: string;
  timeline: string;
};

interface QuoteFormProps {
  onClose: () => void;
}

export default function QuoteForm({ onClose }: QuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Event Details
    eventType: "",
    eventDate: "",
    eventTime: "",
    guestCount: "",
    venue: "",
    venueAddress: "",

    // Step 2: Services & Products
    services: [] as string[],
    products: [] as string[],
    specialRequests: "",

    // Step 3: Budget & Preferences
    budgetRange: "",
    style: "",
    colorScheme: "",
    inspiration: "",

    // Step 4: Contact Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredContact: "",
    timeline: "",
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayUpdate = (
    field: string,
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(
            (item) => item !== value
          ),
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Quote request submitted! We'll get back to you within 24 hours.");
    onClose();
  };

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="bg-white">
      {/* Header */}
      <FormHeader currentStep={currentStep} steps={steps} progress={progress} />

      {/* Form Content */}
      <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
        {/* Step 1: Event Details */}
        {currentStep === 1 && (
          <FormEventDetails
            formData={formData}
            updateFormData={updateFormData}
          />
        )}

        {/* Step 2: Services & Products */}
        {currentStep === 2 && (
          <FormProducts
            formData={formData}
            updateFormData={updateFormData}
            handleArrayUpdate={handleArrayUpdate}
          />
        )}

        {/* Step 3: Budget & Preferences */}
        {currentStep === 3 && (
          <FormPreferences
            formData={formData}
            updateFormData={updateFormData}
          />
        )}

        {/* Step 4: Contact Information */}
        {currentStep === 4 && (
          <FormContact formData={formData} updateFormData={updateFormData} />
        )}

        {/* Step 5: Contact Information */}
        {currentStep === 5 && <FormReview formData={formData} />}
      </div>

      {/* Navigation Footer */}
      <FormFooter
        currentStep={currentStep}
        steps={steps}
        prevStep={prevStep}
        nextStep={nextStep}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
