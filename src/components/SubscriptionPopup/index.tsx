"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { X, Mail, Gift, Star } from "lucide-react";
import Cookies from "js-cookie";
import PrimaryButton, { ButtonSize } from "../CodidgeUI/PrimaryButton";
import { addSubscriberAction } from "@/lib/actions/subscriber";

interface SubscriberFormData {
  name: string;
  email: string;
}

const SubscriberPopup: React.FC = () => {
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SubscriberFormData>({});

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = Cookies.get("prestige-rides-popup-seen");

    if (!hasSeenPopup) {
      // Show popup after 3 seconds delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const onSubmit = async (data: SubscriberFormData) => {
    startTransition(async () => {
      try {
        const subscriber = {
          email: data.email,
          name: data.name,
        };

        const res = await addSubscriberAction({ formData: subscriber });

        if (res?.alreadySubscribed) {
          setAlreadySubscribed(true);
          setIsSubmitted(true); // show message
          return;
        }

        if (res) {
          setIsSubmitted(true);
        }
      } catch (error) {
        console.error("Error subscribing:", error);
      }
    });
  };

  const handleClose = () => {
    setIsVisible(false);
    // Set cookie to remember user has seen popup (expires in 30 days)
    Cookies.set("prestige-rides-popup-seen", "true", { expires: 30 });
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-75 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 max-w-md w-full mx-4 border border-primary/20 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-yellow-400 p-3 rounded-full">
                  <Gift className="w-8 h-8 text-black" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                Welcome to Golden Wheels!
              </h2>
              <p className="text-gray-300 text-sm">
                Join our exclusive VIP list and get special offers on luxury
                transportation
              </p>
            </div>

            {/* Benefits */}
            <div className="mb-6 space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <Star className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                <span>20% off your first booking</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Star className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                <span>Exclusive access to premium vehicles</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Star className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                <span>Priority booking for special events</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${
                    errors.name ? "border-red-500" : "border-gray-600"
                  } text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors`}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  } text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors`}
                  placeholder="Your email address"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <PrimaryButton
                loading={isPending}
                size={ButtonSize.LARGE}
                type="submit"
                disabled={isSubmitting}
                className="flex items-center"
              >
                {isSubmitting ? (
                  "Joining VIP List..."
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Join VIP List & Get 20% Off
                  </>
                )}
              </PrimaryButton>
            </form>

            <p className="text-xs text-gray-400 text-center mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-4">
            <div className="flex justify-center mb-4">
              <div className="bg-green-500 p-3 rounded-full">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-green-400 mb-2">
              {alreadySubscribed
                ? "You're already on the VIP List!"
                : "Welcome to the VIP List!"}
            </h2>
            <p className="text-gray-300 mb-4">
              {alreadySubscribed
                ? "Looks like you've already subscribed. Keep an eye on your inbox for the latest offers."
                : "Thank you for joining! Check your email for your exclusive 20% discount coupon."}
            </p>
            {!alreadySubscribed && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-primary font-semibold text-sm">
                  Your VIP benefits are now active!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriberPopup;
