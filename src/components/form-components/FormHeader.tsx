import { Progress } from "../ui/progress";

type StepsProps = {
  id: number;
  title: string;
  description: string;
};
type FormHeaderProps = {
  currentStep: number;
  steps: StepsProps[];
  progress: number;
};

export default function FormHeader({
  currentStep,
  steps,
  progress,
}: FormHeaderProps) {
  return (
    <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-red-100 to-primary-foreground">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Get Your Quote</h2>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            Step {currentStep} of {steps.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-gray-900">
          {steps[currentStep - 1].title}
        </h3>
        <p className="text-sm text-gray-600">
          {steps[currentStep - 1].description}
        </p>
      </div>
    </div>
  );
}
