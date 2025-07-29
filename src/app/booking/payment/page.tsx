"use client";

import React from "react";
import { CheckoutForm } from "../../../components/Payment/checkoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { TripSummary } from "@/components/Payment/summary";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API ?? "");

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
