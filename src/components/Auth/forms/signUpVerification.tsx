import { useSearchParams } from "next/navigation";
import React, { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import VerificationInput from "react-verification-input";
import { confirmSignUp, fetchUserAttributes, signIn } from "aws-amplify/auth";
import { MailCheck } from "lucide-react";
import Label from "@/components/CodidgeUI/Label";
import PrimaryButton from "@/components/CodidgeUI/PrimaryButton";

export const SignUpVerification = ({
  onSuccess,
}: {
  onSuccess: (userId: string, formData: any) => void;
}) => {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [loginError, setLoginError] = useState("");

  const emailFromParams = searchParams.get("email") || "";
  const passwordFromParams = searchParams.get("password") || "";
  const phoneParams = searchParams.get("phone") || "";
  const fullNameParams = searchParams.get("fullName") || "";

  const { control, handleSubmit } = useForm<{ code: string }>({
    defaultValues: {
      code: "",
    },
  });

  const onVerifySubmit = async (formData: { code: string }) => {
    startTransition(async () => {
      try {
        await confirmSignUp({
          username: emailFromParams,
          confirmationCode: formData.code,
        });

        const user = await signIn({
          username: emailFromParams,
          password: passwordFromParams,
        });

        if (user.isSignedIn) {
          const att = await fetchUserAttributes();
          const userId = att?.["sub"] || "";

          onSuccess(userId, {
            email: emailFromParams,
            name: fullNameParams,
            phone: phoneParams,
            id: userId,
          });
        }
      } catch (err) {
        setLoginError("Verification failed");
        console.log("Verification failed:", err);
      }
    });
  };

  return (
    <form
      className="space-y-6 grid justify-center max-w-sm mx-auto"
      onSubmit={handleSubmit(onVerifySubmit)}
    >
      <div className="flex items-center gap-2">
        <MailCheck size={18} />
        <Label className="!mb-0">
          Enter the 6-digit code sent to your email
        </Label>
      </div>
      <Controller
        name="code"
        control={control}
        rules={{
          required: "Code is required",
          minLength: { value: 6, message: "Code must be 6 digits" },
          maxLength: { value: 6, message: "Code must be 6 digits" },
          pattern: {
            value: /^[0-9]{6}$/,
            message: "Only numbers allowed",
          },
        }}
        render={({ field }) => (
          <div>
            <VerificationInput
              {...field}
              length={6}
              placeholder=""
              validChars="0-9"
              inputProps={{
                className:
                  "w-10 h-10 mx-1 text-center border border-gray-300 rounded rounded-xl focus:border-brand-500",
              }}
              onChange={(value: string) => field.onChange(value)}
            />
          </div>
        )}
      />
      <div>
        {loginError && (
          <p className="mb-2 text-sm text-red-500">{loginError}</p>
        )}
        <PrimaryButton loading={isPending} type="submit" className="w-full">
          Send Code
        </PrimaryButton>
      </div>
    </form>
  );
};
