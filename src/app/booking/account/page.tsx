"use client";

import { SignInForm } from "@/components/AuthForms/signInForm";
import { SignUpForm } from "@/components/AuthForms/signUpForm";
import { SignUpVerification } from "@/components/AuthForms/signUpVerification";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const AccountPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const emailFromParams = searchParams.get("step") || "";

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-gray-900 rounded-xl p-8">
          {emailFromParams ? (
            <SignUpVerification
              onSuccess={() => {
                router.push("/booking/payment");
              }}
            />
          ) : (
            <div>
              <div className="flex mb-8 bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                    !isSignUp
                      ? "bg-yellow-400 text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                    isSignUp
                      ? "bg-yellow-400 text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {isSignUp ? (
                <SignUpForm
                  onSuccess={() => {
                    router.push("/booking/payment");
                  }}
                />
              ) : (
                <SignInForm />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
