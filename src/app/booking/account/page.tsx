"use client";
import React, { Suspense } from "react";
import { AccountStep } from "@/components/AcountLogin";

const AccountPage: React.FC = () => {
  return (
    <Suspense>
      <AccountStep />
    </Suspense>
  );
};

export default AccountPage;
