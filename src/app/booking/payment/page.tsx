"use client";

import React from "react";
import { TripSummary } from "./widgets/summary";
import { CheckoutForm } from "./widgets/checkoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useBooking } from "../BookingProvider";

const stripePromise = loadStripe(
  "pk_test_51RLpU2CyTnLlqBBumW0My11NYuF7WPNUvr5yS9lq8c8SDQZv6iMV6YA49NeLZzTlkul3c7CBMFiUV8tBohanpX7100ipESDtWR"
);

const PaymentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Payment Form */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
          <TripSummary />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
