"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "../CodidgeUI/modal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AuthFormWrapper } from "../Auth";
import { addCustomerAction, getCustomerAction } from "@/lib/actions/customer";
import { useCustomer } from "@/context/authProvider";
import { ICustomer } from "@/interfaces/customer";

export const LoginModal = () => {
  const { refreshCustomer, customer } = useCustomer();

  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const auth = searchParams.get("auth");

  useEffect(() => {
    const authParam = searchParams.get("auth");
    if (authParam) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [searchParams]);

  const handleLoginSuccess = async (userId: string) => {
    const customer = await getCustomerAction(userId);
    console.log("::customer", customer);
    refreshCustomer(customer as ICustomer);
  };

  const handleRegisterSuccess = async (userId: string, formData: any) => {
    const customer = await addCustomerAction({
      email: formData.email,
      name: formData.fullName,
      phone: formData.phone,
      id: userId,
    });
    refreshCustomer(customer);
  };

  const handleClose = () => {
    setOpen(false);
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    // Remove `auth` param from the URL
    current.delete("auth");

    const newQuery = current.toString();
    const newPath = `${window.location.pathname}${
      newQuery ? `?${newQuery}` : ""
    }`;
    router.replace(newPath);
  };

  return (
    <Modal
      className="m-4 md:m-10 lg:max-w-1/2 xl:max-w-1/3 !bg-gray-800 p-2"
      isOpen={open && !customer}
      onClose={handleClose}
    >
      <div className="p-10">
        {(auth === "login" || auth === "register") && (
          <div className="flex mb-8 bg-gray-900 rounded-lg p-1">
            <button
              onClick={() => {
                router.push(`${pathname}?auth=login`);
              }}
              className={`flex-1 text-sm md:text-base py-2 px-4 rounded-md transition-colors ${
                auth === "login"
                  ? "bg-yellow-400 text-black"
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
                  ? "bg-yellow-400 text-black"
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
    </Modal>
  );
};
