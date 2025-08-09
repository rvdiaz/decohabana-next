import { BookingRouteGuard } from "@/components/Booking/BookingRoutesGuard";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { addCustomerAction, getCustomerAction } from "@/lib/actions/customer";
import { useCustomer } from "@/context/authProvider";
import { ICustomer } from "@/interfaces/customer";
import { AuthFormWrapper } from "../Auth";

export const AccountStep = () => {
  const router = useRouter();
  const { refreshCustomer } = useCustomer();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const auth = searchParams.get("auth");

  const handleLoginSuccess = async (userId: string) => {
    const customer = await getCustomerAction(userId);
    refreshCustomer(customer as ICustomer);
    router.push("/booking/payment");
  };

  const handleRegisterSuccess = async (userId: string, formData: any) => {
    const customer = await addCustomerAction({
      email: formData.email,
      name: formData.fullName,
      phone: formData.phone,
      id: userId,
    });
    refreshCustomer(customer);
    router.push("/booking/payment");
  };

  return (
    <BookingRouteGuard>
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-gray-900 rounded-xl p-8">
            <div className="text-2xl mb-4 text-center">
              <h2 className="text-lg md:text-xl font-semibold mb-6 text-primary-500">
                Sign In or Create Account
              </h2>
            </div>
            {(auth === "register" || auth === "login" || !auth) && (
              <div className="flex mb-8 bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => {
                    router.push(`${pathname}?auth=login`);
                  }}
                  className={`flex-1 text-sm md:text-base py-2 px-4 rounded-md transition-colors ${
                    auth !== "register"
                      ? "bg-primary-400 text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    router.push(`${pathname}?auth=register`);
                  }}
                  className={`flex-1 text-sm md:text-base py-2 px-4 rounded-md transition-colors ${
                    auth === "register"
                      ? "bg-primary-400 text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Create Account
                </button>
              </div>
            )}
            <AuthFormWrapper
              onSignUpSuccess={handleRegisterSuccess}
              onLoginSuccess={handleLoginSuccess}
            />
          </div>
        </div>
      </div>
    </BookingRouteGuard>
  );
};
