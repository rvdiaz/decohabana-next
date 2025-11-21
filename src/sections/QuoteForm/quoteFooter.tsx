import React from "react";

interface FormFooterProps {
  currentStep: number;
  steps: any[];
  prevStep: () => void;
  nextStep: () => void;
  handleSubmit: () => void;
  isValid?: boolean;
  isSubmitting?: boolean;
}

export default function FormFooter({
  currentStep,
  steps,
  prevStep,
  nextStep,
  handleSubmit,
  isValid = true,
  isSubmitting = false,
}: FormFooterProps) {
  const isLastStep = currentStep === steps.length;

  return (
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
      <div className="flex justify-between items-center">
        {/* Back Button */}
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1 || isSubmitting}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            currentStep === 1 || isSubmitting
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Back
        </button>

        {/* Step Indicator */}
        <div className="text-sm text-gray-600">
          Step {currentStep} of {steps.length}
        </div>

        {/* Next/Submit Button */}
        {isLastStep ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
              !isValid || isSubmitting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Quote Request"
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={nextStep}
            disabled={!isValid || isSubmitting}
            className={`px-6 py-2 text-sm font-medium rounded-md transition-all ${
              !isValid || isSubmitting
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary"
            }`}
          >
            Next
          </button>
        )}
      </div>

      {/* Validation Message */}
      {!isValid && !isSubmitting && (
        <div className="mt-3 text-center">
          <p className="text-sm text-red-600">
            Please fill in all required fields before proceeding
          </p>
        </div>
      )}
    </div>
  );
}
