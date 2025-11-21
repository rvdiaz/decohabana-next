import { eventTypes } from "@/app/db/eventTypes";
import { FormData } from "../QuoteForm";
import { Check } from "lucide-react";

type FormContactProps = {
  formData: FormData;
};

export default function FormReview({ formData }: FormContactProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-lg mb-4 text-gray-900">
          Review Your Request
        </h3>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">Event Details</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                Type:{" "}
                {eventTypes.find((t) => t.id === formData.eventType)?.label ||
                  "Not specified"}
              </p>
              <p>Date: {formData.eventDate || "Not specified"}</p>
              <p>Time: {formData.eventTime || "Not specified"}</p>
              <p>Guests: {formData.guestCount || "Not specified"}</p>
              <p>Venue: {formData.venue || "Not specified"}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900">Services Requested</h4>
            <div className="text-sm text-gray-600">
              {formData.services.length > 0
                ? formData.services.join(", ")
                : "None selected"}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900">Products Needed</h4>
            <div className="text-sm text-gray-600">
              {formData.products.length > 0
                ? formData.products.join(", ")
                : "None selected"}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900">Budget & Style</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Budget: {formData.budgetRange || "Not specified"}</p>
              <p>Style: {formData.style || "Not specified"}</p>
              <p>Colors: {formData.colorScheme || "Not specified"}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900">Contact Information</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                Name: {formData.firstName} {formData.lastName}
              </p>
              <p>Email: {formData.email}</p>
              <p>Phone: {formData.phone}</p>
              <p>Preferred Contact: {formData.preferredContact}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Check className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">What happens next?</p>
            <ul className="mt-2 space-y-1">
              <li>• We'll review your request within 24 hours</li>
              <li>• Our team will contact you to discuss details</li>
              <li>• We'll provide a detailed quote and timeline</li>
              <li>• Schedule a consultation if needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
