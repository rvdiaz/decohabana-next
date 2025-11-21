"use client";

import { createQuoteAction } from "@/lib/actions/actions";
import { ICreateQuoteInput, IImage } from "@/lib/interfaces";
import { useState } from "react";
import FormHeader from "./quoteHeader";
import QuoteEventDetails from "./quoteEventDetails";
import QuoteEventNeeds from "./quoteEventNeeds";
import QuoteInspiration from "./quoteInspiration";
import QuoteReview from "./quoteReview";
import FormFooter from "./quoteFooter";
import { ContactInfo } from "./contactInfo";
import { isValidEmail, isValidUSPhone } from "@/lib/utils";
import QuoteSuccessModal from "./successDisplay";

export type QuoteFormData = {
  // Basic Event Details
  eventType: string;
  otherEventType?: string;
  date: string;
  location: string;
  peopleCount: number;

  // Event Needs
  needChairs: boolean;
  chairsCount: number;
  needTables: boolean;
  tablesCount: number;
  needTents: boolean;
  tentsCount: number;

  // Inspiration
  inspirationImages: IImage[];

  // Contact
  contactInfo: {
    phone: string;
    email: string;
    name: string;
  };
};

interface QuoteFormProps {
  onClose: () => void;
}

const steps = [
  { title: "Event Details", description: "Basic information about your event" },
  { title: "Event Needs", description: "Chairs, tables, and tents" },
  { title: "Inspiration", description: "Upload inspiration images" },
  { title: "Contact", description: "How to contact you" },
  { title: "Review", description: "Review and submit your quote" },
];

export default function QuoteFormDeco({ onClose }: QuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<QuoteFormData>({
    eventType: "",
    otherEventType: "",
    date: "",
    location: "",
    peopleCount: 0,
    needChairs: false,
    chairsCount: 0,
    needTables: false,
    tablesCount: 0,
    needTents: false,
    tentsCount: 0,
    inspirationImages: [],
    contactInfo: {
      email: "",
      name: "",
      phone: "",
    },
  });

  const updateFormData = (field: keyof QuoteFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare input for the mutation
      const input: ICreateQuoteInput = {
        eventType: formData.eventType,
        otherEventType:
          formData.eventType === "other" ? formData.otherEventType : undefined,
        date: formData.date,
        location: formData.location,
        peopleCount: formData.peopleCount,
        inspirationImages:
          formData.inspirationImages.length > 0
            ? formData.inspirationImages
            : undefined,
        needChairs: formData.needChairs || undefined,
        chairsCount: formData.needChairs ? formData.chairsCount : undefined,
        needTables: formData.needTables || undefined,
        tablesCount: formData.needTables ? formData.tablesCount : undefined,
        needTents: formData.needTents || undefined,
        tentsCount: formData.needTents ? formData.tentsCount : undefined,
        contactInfo: formData.contactInfo,
      };

      // Remove undefined values
      Object.keys(input).forEach((key) => {
        if (input[key as keyof ICreateQuoteInput] === undefined) {
          delete input[key as keyof ICreateQuoteInput];
        }
      });

      // Call the server action
      const result = await createQuoteAction(input);

      if (result?.createQuote?.success) {
        setSuccess(true);
      } else {
        throw new Error(
          result?.createQuote?.message || "Failed to submit quote"
        );
      }
    } catch (err) {
      console.error("Error submitting quote:", err);
      setError(
        err instanceof Error ? err.message : "Failed to submit quote request"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  // Validation for each step
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.eventType !== "" &&
          (formData.eventType !== "other" || formData.otherEventType !== "") &&
          formData.date !== "" &&
          formData.location !== "" &&
          formData.peopleCount > 0
        );
      case 2:
        return (
          (!formData.needChairs || formData.chairsCount > 0) &&
          (!formData.needTables || formData.tablesCount > 0) &&
          (!formData.needTents || formData.tentsCount > 0)
        );
      case 3:
        return true; // Inspiration images are optional
      case 4:
        return (
          !!formData.contactInfo.name &&
          !!formData.contactInfo.phone &&
          isValidUSPhone(formData.contactInfo.phone) &&
          !!formData.contactInfo.email &&
          isValidEmail(formData.contactInfo.email)
        );
      case 5:
        return true; // Review step
      default:
        return false;
    }
  };

  if (success) {
    return (
      <QuoteSuccessModal
        onClose={() => {
          onClose();
        }}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-4xl mx-auto">
      {/* Header */}
      <FormHeader currentStep={currentStep} steps={steps} progress={progress} />

      {/* Error Display */}
      {error && (
        <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Form Content */}
      <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
        {/* Step 1: Event Details */}
        {currentStep === 1 && (
          <QuoteEventDetails
            formData={formData}
            updateFormData={updateFormData}
          />
        )}

        {/* Step 2: Event Needs */}
        {currentStep === 2 && (
          <QuoteEventNeeds
            formData={formData}
            updateFormData={updateFormData}
          />
        )}

        {/* Step 3: Inspiration Images */}
        {currentStep === 3 && (
          <QuoteInspiration
            formData={formData}
            updateFormData={updateFormData}
          />
        )}

        {currentStep === 4 && (
          <ContactInfo formData={formData} updateFormData={updateFormData} />
        )}

        {/* Step 4: Review */}
        {currentStep === 5 && <QuoteReview formData={formData} />}
        {/* Step 4: Review */}
      </div>

      {/* Navigation Footer */}
      <FormFooter
        currentStep={currentStep}
        steps={steps}
        prevStep={prevStep}
        nextStep={nextStep}
        handleSubmit={handleSubmit}
        isValid={isStepValid()}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
