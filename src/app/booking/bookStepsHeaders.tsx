"use client";

import { ChevronLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const BookingStepsHeader = () => {
  const pathname = usePathname();

  const routes = [
    "/booking/select-car",
    "/booking/account",
    "/booking/payment",
    "/booking/success",
  ];

  const currentIndex = routes.indexOf(pathname);

  const stepTitles: Record<string, string> = {
    "/booking/select-car": "Select Your Vehicle",
    "/booking/account": "Your Account",
    "/booking/payment": "Payment",
    "/booking/success": "Booking Complete",
  };

  const getStatus = (stepIndex: number, route: string) => {
    if (stepIndex === 0) return "completed"; // first step always completed
    if (routes.indexOf(route) < currentIndex) return "completed";
    if (routes.indexOf(route) === currentIndex) return "current";
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

  const steps = [
    { label: "Booking Details", route: "/booking/select-car" }, // always completed
    { label: "Select Vehicle", route: "/booking/select-car" },
    { label: "Account", route: "/booking/account" },
    { label: "Payment", route: "/booking/payment" },
  ];

  const router = useRouter();

  const handlePrev = () => {
    router.back();
  };

  const title = stepTitles[pathname] || "Booking";

  return (
    <div>
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={handlePrev}
                className="mr-4 p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">{title}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
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
    </div>
  );
};
