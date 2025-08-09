"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Amplify } from "aws-amplify";
import { getCurrentUser } from "aws-amplify/auth";
import {
  getCustomerAction,
  getCustomerBookingAction,
} from "@/lib/actions/customer";
import { ICustomer } from "@/interfaces/customer";
import { IBooking } from "@/interfaces/booking";

type CustomerContextType = {
  customer: ICustomer | null;
  customerBookings: {
    past: IBooking[];
    upcoming: IBooking[];
  } | null;
  updateBooking: (boo: IBooking) => void;
  loadingBookings: boolean;
  loading: boolean;
  refreshCustomer: (cus: ICustomer | null) => Promise<void>;
  signOut: () => Promise<void>;
};

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomer] = useState<ICustomer | null>(null);
  const [customerBookings, setCustomerBookings] = useState<{
    past: IBooking[];
    upcoming: IBooking[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(false);

  // Configure Amplify once on the client
  useEffect(() => {
    Amplify.configure({
      Auth: {
        Cognito: {
          userPoolId: process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID ?? "",
          userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID ?? "",
          loginWith: {
            email: true,
          },
        },
      },
    });
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const user = await getCurrentUser();
        if (!user.userId) {
          setCustomer(null);
        } else {
          const customer = await getCustomerAction(user.userId);
          refreshCustomer(customer as ICustomer);
        }
      } catch (error) {
        console.log(":::error get customer", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const getCustomerBookings = async (customerId: string) => {
      try {
        setLoadingBookings(true);
        const bookings = await getCustomerBookingAction(customerId);
        setCustomerBookings(bookings);
        setLoadingBookings(false);
      } catch (error) {
        console.log(":::error customer booking", error);
        setLoadingBookings(false);
      }
    };

    if (customer?.id) {
      getCustomerBookings(customer?.id);
    }

    // getUser();
  }, [customer?.id]);

  const refreshCustomer = async (customer: ICustomer | null) => {
    try {
      setCustomer(customer);
    } catch {
      setCustomer(null);
    } finally {
      setLoading(false);
    }
  };

  const updateBooking = (updatedBooking: IBooking) => {
    const newUpdates = customerBookings?.upcoming.map((prevBook) =>
      prevBook.id === updatedBooking.id ? updatedBooking : prevBook!
    );

    setCustomerBookings({
      past: customerBookings?.past ?? [],
      upcoming: newUpdates ?? [],
    });
  };

  const signOut = async () => {
    await signOut();
    setCustomer(null);
  };

  return (
    <CustomerContext.Provider
      value={{
        customer,
        loading,
        loadingBookings,
        customerBookings,
        updateBooking,
        refreshCustomer,
        signOut,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

// Hook to use in components
export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within AuthProvider");
  }
  return context;
};
