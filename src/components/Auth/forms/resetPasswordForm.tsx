import { useForm } from "react-hook-form";
import { ReactNode, useState } from "react";
import { resetPassword } from "aws-amplify/auth";
import { usePathname, useRouter } from "next/navigation";
import Input from "../../CodidgeUI/InputField";
import PrimaryButton from "../../CodidgeUI/PrimaryButton";
import TextButton from "@/components/CodidgeUI/TextButton";

type FormData = {
  email: string;
};

export const ResetPasswordForm = ({ header }: { header: ReactNode }) => {
  const [loading, setloading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      setloading(true);
      const passResponse = await resetPassword({
        username: data.email,
      });

      if (passResponse.isPasswordReset) {
        router.push(`${pathname}?auth=login`);
      }

      if (
        passResponse.nextStep.resetPasswordStep ===
        "CONFIRM_RESET_PASSWORD_WITH_CODE"
      ) {
        router.push(
          `${pathname}?auth=confirm-reset-password&email=${data.email}`
        );
      }
    } catch (error) {
      console.log("Authentication failed:", error);
      setLoginError("Reset password failed");
    } finally {
      setloading(false);
    }
  };

  const backToLogin = () => {
    router.push(`${pathname}?auth=login`);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          {header}
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <Input
                    label="Email *"
                    type="email"
                    error={!!errors.email}
                    placeholder="info@gmail.com"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-error-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end">
                  <TextButton
                    type="button"
                    onClick={backToLogin}
                    className="!text-white hover:!bg-transparent hover:!text-primary-500 !text-sm"
                  >
                    Back
                  </TextButton>
                </div>
                <div>
                  {loginError && (
                    <p className="mb-2 text-sm text-red-500">{loginError}</p>
                  )}
                  <PrimaryButton
                    loading={loading}
                    type="submit"
                    className="w-full"
                  >
                    Send Code
                  </PrimaryButton>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
