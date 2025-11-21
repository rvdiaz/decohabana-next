import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

type StepsProps = {
  id: number;
  title: string;
  description: string;
};
type FormFooterProps = {
  currentStep: number;
  steps: StepsProps[];
  prevStep: () => void;
  nextStep: () => void;
  handleSubmit: () => void;
};
export default function FormFooter({
  currentStep,
  steps,
  prevStep,
  nextStep,
  handleSubmit,
}: FormFooterProps) {
  return (
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
      <Button
        variant="outline"
        onClick={prevStep}
        disabled={currentStep === 1}
        className="flex items-center space-x-2"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </Button>

      <div className="flex space-x-2">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`w-2 h-2 rounded-full transition-colors ${
              step.id <= currentStep ? "bg-red-900" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {currentStep < steps.length ? (
        <Button
          onClick={nextStep}
          className="bg-red-900 hover:bg-red-950 text-white flex items-center space-x-2"
        >
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center space-x-2"
        >
          <Check className="h-4 w-4" />
          <span>Submit Request</span>
        </Button>
      )}
    </div>
  );
}
