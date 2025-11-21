import React, { useState } from "react";
import { QuoteFormData } from "./quoteForm";
import { isValidEmail, isValidUSPhone } from "@/lib/utils";

export const ContactInfo = ({
  formData,
  updateFormData,
}: {
  formData: QuoteFormData;
  updateFormData: (field: keyof QuoteFormData, value: any) => void;
}) => {
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  const handleEmailChange = (value: string) => {
    updateFormData("contactInfo", {
      ...formData.contactInfo,
      email: value,
    });

    setErrors((prev) => ({
      ...prev,
      email: isValidEmail(value) ? "" : "Invalid email address",
    }));
  };

  const handlePhoneChange = (value: string) => {
    updateFormData("contactInfo", {
      ...formData.contactInfo,
      phone: value,
    });

    setErrors((prev) => ({
      ...prev,
      phone: isValidUSPhone(value) ? "" : "Invalid US phone number",
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          How to contact you
        </h3>
      </div>
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name *
          </label>
          <input
            type="name"
            value={formData.contactInfo.name || ""}
            onChange={(e) =>
              updateFormData("contactInfo", {
                ...formData.contactInfo,
                name: e.target.value,
              })
            }
            placeholder="Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={formData.contactInfo.email || ""}
            onChange={(e) => handleEmailChange(e.target.value)}
            placeholder="Email"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone *
          </label>
          <input
            type="tel"
            value={formData.contactInfo.phone || ""}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="Phone number"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.phone
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};
