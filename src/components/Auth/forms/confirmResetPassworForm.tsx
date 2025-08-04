import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { confirmResetPassword } from "aws-amplify/auth";
import { Eye, EyeOff } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Label from "../../CodidgeUI/Label";
import Input from "../../CodidgeUI/InputField";
import PrimaryButton from "../../CodidgeUI/PrimaryButton";
import VerificationInput from "react-verification-input";
import TextButton from "@/components/CodidgeUI/TextButton";

type FormData = {
  newPassword: string;
  code: string;
};

export const ConfirmResetPasswordForm = () => {
  const [loading, setloading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const router = useRouter();
  const username = "";
  const pathname = usePathname();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      code: "",
      newPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setloading(true);
      await confirmResetPassword({
        username: username ?? "",
        confirmationCode: data.code,
        newPassword: data.newPassword,
      });

      router.push("/login");
    } catch (error) {
      console.log("::error", error);
      setLoginError("Authentication failed");
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
              Reset Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter code sended to your email and new password!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
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
                  <Label>
                    New Password <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      error={!!errors.newPassword}
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter your new Password"
                      {...register("newPassword", {
                        required: "New Password is required",
                      })}
                    />
                    <span
                      onClick={() => setShowNewPassword((old) => !old)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2 text-gray-400"
                    >
                      {showNewPassword ? (
                        <Eye className="size-5" />
                      ) : (
                        <EyeOff className="size-5" />
                      )}
                    </span>
                  </div>
                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-error-500">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end">
                  <TextButton
                    type="button"
                    onClick={() => {
                      router.push(`${pathname}?auth=login`);
                    }}
                    className="!text-white hover:!bg-transparent hover:!text-yellow-500 !text-sm"
                  >
                    Back to Login
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
                    Reset Password
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
