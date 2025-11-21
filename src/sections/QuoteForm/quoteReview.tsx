import React from "react";
import { QuoteFormData } from "./quoteForm";

interface QuoteReviewProps {
  formData: QuoteFormData;
}

const eventTypeLabels: { [key: string]: string } = {
  wedding: "Wedding",
  birthday: "Birthday Party",
  corporate: "Corporate Event",
  graduation: "Graduation",
  anniversary: "Anniversary",
  babyshower: "Baby Shower",
  other: "Other",
};

export default function QuoteReview({ formData }: QuoteReviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Review Your Quote Request
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          Please review your information before submitting. You can go back to
          make changes if needed.
        </p>
      </div>

      {/* Event Details Section */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Event Details</h4>
        <dl className="space-y-2">
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">Event Type:</dt>
            <dd className="text-sm font-medium text-gray-900">
              {eventTypeLabels[formData.eventType] || formData.eventType}
              {formData.eventType === "other" && formData.otherEventType && (
                <span className="text-gray-600">
                  {" "}
                  - {formData.otherEventType}
                </span>
              )}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">Date:</dt>
            <dd className="text-sm font-medium text-gray-900">
              {formData.date
                ? new Date(formData.date).toLocaleDateString()
                : "Not specified"}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">Location:</dt>
            <dd className="text-sm font-medium text-gray-900">
              {formData.location}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-sm text-gray-600">Expected Guests:</dt>
            <dd className="text-sm font-medium text-gray-900">
              {formData.peopleCount} people
            </dd>
          </div>
        </dl>
      </div>

      {/* Equipment Needs Section */}
      {(formData.needChairs || formData.needTables || formData.needTents) && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Equipment Needs</h4>
          <dl className="space-y-2">
            {formData.needChairs && (
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Chairs:</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {formData.chairsCount} chairs
                </dd>
              </div>
            )}
            {formData.needTables && (
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Tables:</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {formData.tablesCount} tables
                </dd>
              </div>
            )}
            {formData.needTents && (
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Tents:</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {formData.tentsCount} tents
                </dd>
              </div>
            )}
          </dl>
        </div>
      )}

      {/* No Equipment Message */}
      {!formData.needChairs && !formData.needTables && !formData.needTents && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3">Equipment Needs</h4>
          <p className="text-sm text-gray-600">No equipment requested</p>
        </div>
      )}

      {/* Inspiration Images Section */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-3">Inspiration Images</h4>
        {formData.inspirationImages.length > 0 ? (
          <div>
            <p className="text-sm text-gray-600 mb-3">
              {formData.inspirationImages.length} image
              {formData.inspirationImages.length > 1 ? "s" : ""} uploaded
            </p>
            <div className="grid grid-cols-4 gap-2">
              {formData.inspirationImages.slice(0, 8).map((image, index) => (
                <div
                  key={image.s3Key}
                  className="aspect-square rounded overflow-hidden bg-gray-200"
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {formData.inspirationImages.length > 8 && (
                <div className="aspect-square rounded bg-gray-200 flex items-center justify-center">
                  <span className="text-sm text-gray-600">
                    +{formData.inspirationImages.length - 8} more
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600">
            No inspiration images uploaded
          </p>
        )}
      </div>

      {/* Confirmation Message */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <svg
            className="h-5 w-5 text-blue-400 mt-0.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Ready to Submit
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                Once you submit this quote request, our team will review your
                requirements and get back to you within 24 hours with a detailed
                quote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
