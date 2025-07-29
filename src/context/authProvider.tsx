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
import { getCustomerAction } from "@/lib/actions/customer";

export type Customer = {
  id: string;
  email: string;
  name: string;
  phone: string;
};

type CustomerContextType = {
  customer: Customer | null;
  loading: boolean;
  refreshCustomer: (cus: Customer | null) => Promise<void>;
  signOut: () => Promise<void>;
};

const CustomerContext = createContext<CustomerContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);

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
          refreshCustomer(customer as Customer);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const refreshCustomer = async (customer: Customer | null) => {
    try {
      setCustomer(customer);
    } catch {
      setCustomer(null);
    } finally {
      setLoading(false);
    }
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
