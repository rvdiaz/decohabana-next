import PrimaryButton from "@/components/CodidgeUI/PrimaryButton";
import TextButton from "@/components/CodidgeUI/TextButton";
import { useCustomer } from "@/context/authProvider";
import { signOut } from "aws-amplify/auth";
import { LogOut } from "lucide-react";
import React, { useState } from "react";

export const LogoutButton = () => {
  const { refreshCustomer } = useCustomer();
  const [loading, setLoading] = useState(false);

  return (
    <TextButton
      className="text-white hover:bg-transparent hover:text-yellow-400 gap-1"
      loading={loading}
      onClick={async () => {
        try {
          setLoading(true);
          await signOut();
          refreshCustomer(null);
        } catch (error) {
          console.log("::::error", error);
        }
      }}
    >
      <LogOut size={18} /> Logout
    </TextButton>
  );
};
