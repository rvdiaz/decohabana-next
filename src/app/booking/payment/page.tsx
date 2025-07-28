"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Calendar,
  Shield,
  Lock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { saveBookingData, getBookingData } from "@/lib/booking-storage";
import { useCustomer } from "@/context/authProvider";

const PaymentPage: React.FC = () => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState(getBookingData());
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.cardNumber.replace(/\s/g, ""))
      newErrors.cardNumber = "Card number is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
    if (!formData.cvv) newErrors.cvv = "CVV is required";
    if (!formData.cardholderName.trim())
      newErrors.cardholderName = "Cardholder name is required";
    if (!formData.billingAddress.trim())
      newErrors.billingAddress = "Billing address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      saveBookingData({
        payment: {
          method: "credit_card",
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv,
          billingAddress: `${formData.billingAddress}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        },
      });
      router.push("/booking/success");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePrev = () => {
    router.push("/booking/account");
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const calculateTotal = () => {
    const basePrice = bookingData.selectedCar?.price || 0;
    const estimatedHours = 3; // Default estimation
    const subtotal = basePrice * estimatedHours;
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotal();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Payment Form */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-gray-900 rounded-xl p-8">
            <div className="flex items-center mb-6">
              <Lock className="w-5 h-5 text-yellow-400 mr-2" />
              <h2 className="text-xl font-semibold">Secure Payment</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  <CreditCard className="inline w-4 h-4 mr-2" />
                  Card Number
                </label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) =>
                    handleInputChange(
                      "cardNumber",
                      formatCardNumber(e.target.value)
                    )
                  }
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${
                    errors.cardNumber ? "border-red-500" : "border-gray-600"
                  } text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors`}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {errors.cardNumber && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    <Calendar className="inline w-4 h-4 mr-2" />
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      handleInputChange(
                        "expiryDate",
                        formatExpiryDate(e.target.value)
                      )
                    }
                    className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${
                      errors.expiryDate ? "border-red-500" : "border-gray-600"
                    } text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors`}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  {errors.expiryDate && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.expiryDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    <Shield className="inline w-4 h-4 mr-2" />
                    CVV
                  </label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) =>
                      handleInputChange(
                        "cvv",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${
                      errors.cvv ? "border-red-500" : "border-gray-600"
                    } text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors`}
                    placeholder="123"
                    maxLength={4}
                  />
                  {errors.cvv && (
                    <p className="text-red-400 text-sm mt-1">{errors.cvv}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  value={formData.cardholderName}
                  onChange={(e) =>
                    handleInputChange("cardholderName", e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${
                    errors.cardholderName ? "border-red-500" : "border-gray-600"
                  } text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors`}
                  placeholder="John Doe"
                />
                {errors.cardholderName && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.cardholderName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Billing Address
                </label>
                <input
                  type="text"
                  value={formData.billingAddress}
                  onChange={(e) =>
                    handleInputChange("billingAddress", e.target.value)
                  }
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${
                    errors.billingAddress ? "border-red-500" : "border-gray-600"
                  } text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors`}
                  placeholder="123 Main Street"
                />
                {errors.billingAddress && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.billingAddress}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${
                      errors.city ? "border-red-500" : "border-gray-600"
                    } text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors`}
                    placeholder="New York"
                  />
                  {errors.city && (
                    <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${
                      errors.state ? "border-red-500" : "border-gray-600"
                    } text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors`}
                    placeholder="NY"
                  />
                  {errors.state && (
                    <p className="text-red-400 text-sm mt-1">{errors.state}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${
                    errors.zipCode ? "border-red-500" : "border-gray-600"
                  } text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors`}
                  placeholder="10001"
                />
                {errors.zipCode && (
                  <p className="text-red-400 text-sm mt-1">{errors.zipCode}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold py-4 px-6 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                Complete Payment
                <ChevronRight className="ml-2 w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="bg-gray-900 rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-6 text-yellow-400">
              Booking Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-300">Service:</span>
                <span>{bookingData.selectedCar?.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-300">Date & Time:</span>
                <span>
                  {bookingData.date} at {bookingData.time}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-300">Route:</span>
                <span className="text-right">
                  {bookingData.from} → {bookingData.to}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-300">Customer:</span>
                <span>{bookingData.user?.name}</span>
              </div>

              <hr className="border-gray-700" />

              <div className="flex justify-between">
                <span className="text-gray-300">Base Rate (3 hours):</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-300">Tax (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <hr className="border-gray-700" />

              <div className="flex justify-between text-xl font-bold text-yellow-400">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-yellow-400/10 rounded-lg border border-yellow-400/20">
              <p className="text-sm text-yellow-400 mb-2">
                <Shield className="inline w-4 h-4 mr-1" />
                Secure Payment
              </p>
              <p className="text-xs text-gray-300">
                Your payment information is encrypted and secure. We never store
                your credit card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
