"use client";

import { useCustomer } from "@/context/authProvider";
import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const BookingStepsHeader = () => {
  const { customer } = useCustomer(); // access customer status

  const pathname = usePathname();
  const router = useRouter();

  // All possible steps
  const allSteps = [
    { label: "Booking Details", route: "/booking/select-car" }, // optional intro
    { label: "Select Vehicle", route: "/booking/select-car" },
    { label: "Account", route: "/booking/account" },
    { label: "Payment", route: "/booking/payment" },
  ];

  // Filter out "Account" if user is signed in
  const steps = customer
    ? allSteps.filter((step) => step.route !== "/booking/account")
    : allSteps;

  // Step title mapping
  const stepTitles: Record<string, string> = {
    "/booking/select-car": "Select Your Vehicle",
    "/booking/account": "Your Account",
    "/booking/payment": "Payment",
    "/booking/success": "Booking Complete",
  };

  const title = stepTitles[pathname] || "Booking";

  // Extract routes to calculate currentIndex
  const stepRoutes = steps.map((s) => s.route);
  const currentIndex = stepRoutes.indexOf(pathname);

  const getStatus = (stepIndex: number, route: string) => {
    if (stepIndex === 0) return "completed";
    if (stepRoutes.indexOf(route) < currentIndex) return "completed";
    if (stepRoutes.indexOf(route) === currentIndex) return "current";
    return "upcoming";
  };

  const circleStyle = (status: string) => {
    if (status === "completed") return "bg-green-500 text-black";
    if (status === "current") return "bg-yellow-400 text-black";
    return "bg-gray-600 text-white";
  };

  const labelStyle = (status: string) => {
    if (status === "current") return "text-yellow-400";
    if (status === "completed") return "text-white";
    return "text-gray-400";
  };

  const handlePrev = () => {
    const route = pathname;

    if (customer) {
      // Logged in user flow: select-car → payment
      if (route === "/booking/payment") {
        router.push("/booking/select-car");
      } else if (route === "/booking/select-car") {
        // Optional: navigate out or disable if it's the first step
        router.push("/"); // Or router.back() or do nothing
      }
    } else {
      // Guest user flow: select-car → account → payment
      if (route === "/booking/payment") {
        router.push("/booking/account");
      } else if (route === "/booking/account") {
        router.push("/booking/select-car");
      }
    }
  };

  return (
    <div className="sticky top-0">
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-2 md:py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={handlePrev}
                className="mr-4 p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
              </button>
              <h1 className="text-lg md:text-2xl font-bold">{title}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-gray-900 pt-4 md:py-4">
        <div className="max-w-6xl mx-auto px-4">
          {/* Mobile: Line of numbered steps */}
          <div className="md:hidden px-0 md:px-4 space-y-2">
            {/* Step Circles with connecting line */}
            <div className="flex items-center justify-between relative">
              {steps.map((step, index) => {
                const status = getStatus(index, step.route);

                return (
                  <div
                    key={index}
                    className="flex-1 relative flex justify-center"
                  >
                    <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200" />
                    <div
                      className={`z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${circleStyle(
                        status
                      )}`}
                    >
                      {status === "completed" ? "✓" : index + 1}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Current Step Text */}
            <div className="text-center text-sm text-gray-300">
              Step {Math.min(currentIndex + 1, steps.length)} of {steps.length}
            </div>
          </div>

          {/* Desktop: Full steps with labels */}
          <div className="hidden md:flex justify-between items-center">
            <div className="flex space-x-8">
              {steps.map((step, index) => {
                const status = getStatus(index, step.route);
                return (
                  <div key={index} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${circleStyle(
                        status
                      )}`}
                    >
                      {status === "completed" ? "✓" : index + 1}
                    </div>
                    <span className={`ml-2 text-sm ${labelStyle(status)}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-gray-900 py-2 md:py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4 md:space-x-8">
              {steps.map((step, index) => {
                const status = getStatus(index, step.route);
                return (
                  <div key={index} className="flex items-center">
                    <div
                      className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm font-bold ${circleStyle(
                        status
                      )}`}
                    >
                      {status === "completed" ? "✓" : index + 1}
                    </div>
                    <span className={`ml-2 text-sm ${labelStyle(status)}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};
