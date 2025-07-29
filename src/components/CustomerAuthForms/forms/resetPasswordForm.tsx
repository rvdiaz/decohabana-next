import { useForm } from "react-hook-form";
import { useState } from "react";
import { resetPassword } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import Input from "../../CodidgeUI/InputField";
import Link from "next/link";
import PrimaryButton from "../../CodidgeUI/PrimaryButton";

type FormData = {
  email: string;
};

export const ResetPasswordForm = () => {
  const [loading, setloading] = useState(false);

  const router = useRouter();
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
        router.push("/signin");
      }

      if (
        passResponse.nextStep.resetPasswordStep ===
        "CONFIRM_RESET_PASSWORD_WITH_CODE"
      ) {
        router.push(`/confirm-reset-password/${data.email}`);
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      /* toast.error(
        <div>
          <span className="p-2"> Reset password failed</span>
        </div>,
        { autoClose: 5000 }
      ); */
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Enter your email
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email to receive a code
            </p>
          </div>
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
                  <Link
                    href="/signin"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Back
                  </Link>
                </div>
                <div>
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
