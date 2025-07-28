import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { fetchUserAttributes, signIn, signOut } from "aws-amplify/auth";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import Input from "../CodidgeUI/InputField";
import Link from "next/link";
import PrimaryButton, { ButtonSize } from "../CodidgeUI/PrimaryButton";
import { getCustomerAction } from "@/app/actions/customer";
import { Customer, useCustomer } from "@/context/authProvider";

type FormData = {
  email: string;
  password: string;
};

export const SignInForm = () => {
  const { refreshCustomer } = useCustomer();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const getUserFromDatabase = async (userId: string) => {
    try {
      const customer = await getCustomerAction(userId);
      refreshCustomer(customer as Customer);
      router.push("/booking/payment");
    } catch (error) {
      await signOut();
      console.error("Authentication failed:", error);
      throw new Error("Error is not created in system");
    }
  };

  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      try {
        const user = await signIn({
          username: data.email,
          password: data.password,
        });

        if (user.isSignedIn) {
          const att = await fetchUserAttributes();
          const userId = att?.["sub"] || "";

          await getUserFromDatabase(userId);
        }

        if (user.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_EMAIL_CODE") {
          router.push("/mfa");
        }

        if (
          user.nextStep.signInStep ===
          "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
        ) {
          router.push("/change-password");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
      } finally {
        console.log("::");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6">
        <div>
          <Input
            label={
              <span>
                <Mail className="inline w-4 h-4 mr-2" />
                Email *
              </span>
            }
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
        <div>
          <div className="relative">
            <Input
              label={
                <span>
                  <Lock className="inline w-4 h-4 mr-2" />
                  Password *
                </span>
              }
              error={!!errors.password}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-12 text-gray-400"
            >
              {showPassword ? (
                <Eye className="size-5" />
              ) : (
                <EyeOff className="size-5" />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-error-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex items-center justify-end">
          <Link
            href={"/reset-password"}
            className="text-yellow-400 hover:text-yellow-300 text-sm"
          >
            Forgot your password?
          </Link>
        </div>
        <div>
          <PrimaryButton
            size={ButtonSize.LARGE}
            loading={isPending}
            type="submit"
            className="w-full"
          >
            Sign in
          </PrimaryButton>
        </div>
      </div>
    </form>
  );
};
