import React from "react";
import { QuoteFormData } from "./quoteForm";

interface QuoteEventDetailsProps {
  formData: QuoteFormData;
  updateFormData: (field: keyof QuoteFormData, value: any) => void;
}

const eventTypes = [
  { value: "wedding", label: "Wedding" },
  { value: "birthday", label: "Birthday Party" },
  { value: "corporate", label: "Corporate Event" },
  { value: "graduation", label: "Graduation" },
  { value: "anniversary", label: "Anniversary" },
  { value: "babyshower", label: "Baby Shower" },
  { value: "other", label: "Other" },
];

export default function QuoteEventDetails({
  formData,
  updateFormData,
}: QuoteEventDetailsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Tell us about your event
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Please provide the basic details about your upcoming event.
        </p>
      </div>

      <div className="space-y-4">
        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Type *
          </label>
          <select
            value={formData.eventType}
            onChange={(e) => updateFormData("eventType", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select an event type</option>
            {eventTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Other Event Type (conditional) */}
        {formData.eventType === "other" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Please specify *
            </label>
            <input
              type="text"
              value={formData.otherEventType || ""}
              onChange={(e) => updateFormData("otherEventType", e.target.value)}
              placeholder="Describe your event type"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        {/* Event Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Date *
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => updateFormData("date", e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Location *
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
            placeholder="Enter the venue address or location"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            Include city and state/country for accurate service
          </p>
        </div>

        {/* Guest Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Number of Guests *
          </label>
          <input
            type="number"
            value={formData.peopleCount || ""}
            onChange={(e) =>
              updateFormData("peopleCount", parseInt(e.target.value) || 0)
            }
            placeholder="Enter number of guests"
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <p className="mt-1 text-xs text-gray-500">
            This helps us determine the right amount of equipment and supplies
          </p>
        </div>
      </div>
    </div>
  );
}
