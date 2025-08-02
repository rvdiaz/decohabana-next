import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { fetchUserAttributes, signIn, signOut } from "aws-amplify/auth";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Input from "@/components/CodidgeUI/InputField";
import PrimaryButton, {
  ButtonSize,
} from "@/components/CodidgeUI/PrimaryButton";
import TextButton from "@/components/CodidgeUI/TextButton";

type FormData = {
  email: string;
  password: string;
};

export const SignInForm = ({
  onSuccess,
}: {
  onSuccess: (userId: string) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const [loginError, setLoginError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onLoginSuccess = async (userId: string) => {
    try {
      await onSuccess(userId);
    } catch (error) {
      await signOut();
      setLoginError("Error getting user info");
      console.log("Authentication failed:", error);
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

          await onLoginSuccess(userId);
        }

        if (user.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_EMAIL_CODE") {
          router.push(`${pathname}?auth=mfa`);
        }

        if (
          user.nextStep.signInStep ===
          "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
        ) {
          router.push(`${pathname}?auth=change-password`);
        }
      } catch (error) {
        setLoginError("Authentication failed");
        console.log("Authentication failed:", error);
      }
    });
  };

  const forgetPasswordHandler = () => {
    router.push(`${pathname}?auth=reset-password`);
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
          <TextButton
            type="button"
            onClick={forgetPasswordHandler}
            className="!text-white hover:!bg-transparent hover:!text-yellow-500 !text-sm"
          >
            Forgot your password?
          </TextButton>
        </div>
        <div>
          {loginError && (
            <p className="mb-2 text-sm text-red-500">{loginError}</p>
          )}
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
