"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useBooking } from "@/context/bookingProvider";
import { useCustomer } from "@/context/authProvider";

export const BookingRouteGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { paid } = useBooking();
  const { customer } = useCustomer(); // access customer status
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true); // ensure client-only render
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    // Prevent user from visiting pages after payment
    if (pathname !== "/booking/success" && paid) {
      router.push("/");
    }

    // Prevent access to account page if customer already exists
    if (pathname === "/booking/account" && customer) {
      //router.push("/");
    }
  }, [hydrated, pathname, paid, customer]);

  if (!hydrated) return null;

  return <>{children}</>;
};
