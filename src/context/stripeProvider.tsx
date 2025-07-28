"use client";

import { CheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ReactNode } from "react";

const stripePromise = loadStripe(
  "pk_test_51RLpU2CyTnLlqBBumW0My11NYuF7WPNUvr5yS9lq8c8SDQZv6iMV6YA49NeLZzTlkul3c7CBMFiUV8tBohanpX7100ipESDtWR"
);

const fetchClientSecret = () => {
  return fetch("/create-checkout-session", { method: "POST" })
    .then((response) => response.json())
    .then((json) => json.checkoutSessionClientSecret);
};

export default function StripeProvider({ children }: { children: ReactNode }) {
  return (
    <CheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
      {children}
    </CheckoutProvider>
  );
}
