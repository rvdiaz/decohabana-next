import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { signOut, signUp } from "aws-amplify/auth";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Input from "@/components/CodidgeUI/InputField";
import { PasswordRules } from "../widgets/passwordRules";
import PrimaryButton, {
  ButtonSize,
} from "@/components/CodidgeUI/PrimaryButton";

type FormData = {
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

export const SignUpForm = ({
  onSuccess,
}: {
  onSuccess: (userId: string, formData: any) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const [loginError, setLoginError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSignUpSuccess = async (userId: string, formData: any) => {
    try {
      await onSuccess(userId, formData);
    } catch (error) {
      await signOut();
      setLoginError("Error getting user info");
    }
  };

  const onSignupSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const result = await signUp({
          username: formData.email,
          password: formData.password,
          options: {
            userAttributes: {
              email: formData.email,
              "custom:user_type": "customer",
            },
          },
        });

        const needsVerification =
          result.nextStep.signUpStep === "CONFIRM_SIGN_UP";
        if (needsVerification) {
          router.push(
            `${pathname}?auth=verify-email&email=${encodeURIComponent(
              formData.email
            )}&password=${encodeURIComponent(formData.password)}&phone=${
              formData.phone
            }&fullName=${formData.fullName}`
          );

          return;
        }

        if (!result.userId) {
          throw Error("Error sign up");
        }

        onSignUpSuccess(result.userId, formData);
      } catch (err) {
        setLoginError("Signup error");
        console.log("Signup error:", err);
      }
    });
  };

  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(onSignupSubmit)}>
      <div className="max-h-[50vh] md:max-h-[60vh] overflow-auto">
        <div className="space-y-6">
          <div>
            <Input
              label={
                <span>
                  <User className="inline w-4 h-4 mr-2" />
                  Full name *
                </span>
              }
              type="text"
              error={!!errors.fullName}
              placeholder="John Doe"
              {...register("fullName", {
                required: "Full name is required",
              })}
            />
            {errors.fullName && (
              <p className="mt-1 text-right text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>
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
              <p className="mt-1 text-right text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              label={
                <span>
                  <Phone className="inline w-4 h-4 mr-2" />
                  Phone *
                </span>
              }
              type="text"
              error={!!errors.phone}
              placeholder="+17862345454"
              {...register("phone", {
                required: "Phone is required",
              })}
            />
            {errors.phone && (
              <p className="mt-1 text-right text-sm text-red-500">
                {errors.phone.message}
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
              <p className="mt-1 text-right text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="relative">
            <Input
              label={
                <span>
                  <Lock className="inline w-4 h-4 mr-2" />
                  Confirm Password *
                </span>
              }
              type={showConfirm ? "text" : "password"}
              placeholder="Re-enter your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              error={!!errors.confirmPassword}
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-12 text-gray-400"
            >
              {showConfirm ? (
                <Eye className="size-5" />
              ) : (
                <EyeOff className="size-5" />
              )}
            </span>
            {errors.confirmPassword && (
              <p className="mt-1 text-right text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <PasswordRules password={password} />
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
          Sign Up
        </PrimaryButton>
      </div>
    </form>
  );
};
