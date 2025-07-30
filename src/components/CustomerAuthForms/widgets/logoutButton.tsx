import TextButton from "@/components/CodidgeUI/TextButton";
import { useCustomer } from "@/context/authProvider";
import { signOut } from "aws-amplify/auth";
import { LogOut } from "lucide-react";
import React, { useState } from "react";

export const LogoutButton = ({ className }: { className?: string }) => {
  const { refreshCustomer } = useCustomer();
  const [loading, setLoading] = useState(false);

  return (
    <TextButton
      className={`text-red-400 bg-transparent hover:bg-gray-800 hover:text-red-500 gap-1 ${
        className ?? ""
      }`}
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
