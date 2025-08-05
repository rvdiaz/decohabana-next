import { useCustomer } from "@/context/authProvider";
import React from "react";
import Input from "../CodidgeUI/InputField";
import { PageLoading } from "../CodidgeUI/pageLoading";

export const CustomerProfile = () => {
  const { customer, loading } = useCustomer();

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-primary-400">
          Profile Information
        </h3>
        <div className="space-y-4">
          <div>
            <Input
              label="Full Name"
              type="text"
              value={customer?.name || ""}
              disabled={true}
            />
          </div>
          <div>
            <Input
              label="Email"
              type="email"
              value={customer?.email || ""}
              disabled={true}
            />
          </div>
          <div>
            <Input
              label="Phone"
              type="tel"
              value={customer?.phone || ""}
              disabled={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
