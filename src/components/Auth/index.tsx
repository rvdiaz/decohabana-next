import { useSearchParams } from "next/navigation";
import React from "react";
import { SignInForm } from "./forms/signInForm";
import { SignUpForm } from "./forms/signUpForm";
import { ResetPasswordForm } from "./forms/resetPasswordForm";
import { SignUpVerification } from "./forms/signUpVerification";
import { ConfirmResetPasswordForm } from "./forms/confirmResetPassworForm";

interface IAuthWrapperEvents {
  onLoginSuccess: (userId: string) => void;
  onSignUpSuccess: (userId: string, formData: any) => void;
}

export const AuthFormWrapper = ({
  onLoginSuccess,
  onSignUpSuccess,
}: IAuthWrapperEvents) => {
  const searchParams = useSearchParams();
  const auth = searchParams.get("auth");

  let authWidget = <div></div>;

  if (auth === "login") {
    authWidget = <SignInForm onSuccess={onLoginSuccess} />;
  }

  if (auth === "register") {
    authWidget = <SignUpForm onSuccess={onSignUpSuccess} />;
  }

  if (auth === "verify-email") {
    authWidget = <SignUpVerification onSuccess={onSignUpSuccess} />;
  }

  if (auth === "confirm-reset-password") {
    authWidget = <ConfirmResetPasswordForm />;
  }

  if (auth === "reset-password") {
    authWidget = (
      <ResetPasswordForm
        header={
          <div className="mb-5 sm:mb-8">
            <p className="mb-2 font-semibold text-gray-200 text-title-sm sm:text-title-md">
              Enter your email to receive a code
            </p>
          </div>
        }
      />
    );
  }

  return authWidget;
};
