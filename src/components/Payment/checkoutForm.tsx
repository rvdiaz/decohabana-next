import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { Lock, ChevronRight, Shield } from "lucide-react";
import { useState } from "react";
import PrimaryButton, {
  ButtonSize,
} from "@/components/CodidgeUI/PrimaryButton";
import { useCustomer } from "@/context/authProvider";
import { payBooking } from "@/lib/actions/checkout";
import { useBooking } from "@/context/bookingProvider";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { IPreferedLanguage } from "@/interfaces/booking";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#ffffff",
      fontSize: "16px",
      fontFamily: '"Inter", system-ui, sans-serif',
      backgroundColor: "rgba(0,0,0,0.5)",
      border: "1px solid #4B5563",
      padding: "12px 16px",
      borderRadius: "0.5rem",
      "::placeholder": {
        color: "#9CA3AF",
      },
    },
    invalid: {
      color: "#ef4444",
      iconColor: "#ef4444",
    },
  },
  hidePostalCode: true,
};

export const CheckoutForm = () => {
  const router = useRouter();

  const { bookingParams, selectedCarType, selectedAddons, setBookingState } =
    useBooking();
  const { customer, refreshCustomer } = useCustomer();

  const stripe = useStripe();
  const elements = useElements();
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const totalExtraServices = selectedAddons?.reduce((add: number, item) => {
    add += item.price.amount;

    return add;
  }, 0);

  const onSubmit = async () => {
    try {
      setErrorMsg("");
      if (!stripe || !elements) return;

      const cardNumberElement = elements.getElement(CardNumberElement);
      if (!cardNumberElement) return;

      setLoading(true);
      const result = await stripe.createToken(cardNumberElement);

      if (result.error) {
        setErrorMsg(result.error.message || "Payment failed.");
      } else {
        const extraServ = selectedAddons?.map((serv) => ({
          id: serv.id,
          name: serv.name,
          price: serv.price,
        }));

        const input = {
          bookingDetails: {
            startDate: bookingParams!.startDate,
            endDate: bookingParams!.endDate,
            bookHours: bookingParams!.bookHours,
            bookMode: bookingParams!.bookMode,
            pickupLocation: bookingParams!.pickupLocation,
            dropoffLocation: bookingParams!.dropoffLocation,
            extraServices: extraServ,
            note: bookingParams?.note,
            languagePrefered:
              bookingParams?.languagePrefered ?? IPreferedLanguage.EN,
          },
          selectedCarType: {
            tripQuotePrice: selectedCarType!.tripQuotePrice,
            id: selectedCarType!.id,
            name: selectedCarType!.name,
            supportsHourly: selectedCarType!.supportsHourly,
            supportsDistance: selectedCarType!.supportsDistance,
            hourlyRate: selectedCarType!.hourlyRate,
            pricePerMiles: selectedCarType!.pricePerMiles,
            baseFare: selectedCarType!.baseFare,
            minimumFare: selectedCarType!.minimumFare,
          },
          cardToken: result.token.id,
          totalPrice: {
            amount:
              (selectedCarType?.tripQuotePrice ?? 0) +
              (totalExtraServices ?? 0),
            currencyCode: "USD",
          },
          customerData: {
            id: customer?.id,
            name: customer?.name,
            email: customer?.email,
            phone: customer?.phone,
            externalReference: customer?.externalReference,
          },
        };

        const res = await payBooking(input);

        refreshCustomer({
          ...customer!,
          externalReference:
            res?.customerExternalReference ?? customer?.externalReference,
        });

        if (res?.success) {
          setBookingState({
            bookingCode: res.booking.bookingCode,
          });
          router.push("/booking/success");
        }

        return res;
      }
    } catch (error) {
      toast.error("Payment failed");
      console.log("::error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-4 md:p-8 text-white">
      <div className="flex items-center mb-6">
        <Lock className="w-5 h-5 text-primary-400 mr-2" />
        <h2 className="text-xl font-semibold">Secure Payment</h2>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Card Number */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">
            Card Number
          </label>
          <div className="rounded-lg bg-black/50 border border-gray-600 px-4 py-3">
            <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        {/* Expiration + CVC in same row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              Expiration Date
            </label>
            <div className="rounded-lg bg-black/50 border border-gray-600 px-4 py-3">
              <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">
              CVC
            </label>
            <div className="rounded-lg bg-black/50 border border-gray-600 px-4 py-3">
              <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>
          {errorMsg && <p className="text-red-400 text-sm mt-2">{errorMsg}</p>}
        </div>

        {/* Submit */}
        <PrimaryButton
          size={ButtonSize.MEDIUM}
          type="submit"
          loading={loading}
          disabled={!stripe}
          className="flex items-center justify-center"
        >
          Complete Payment
          <ChevronRight className="ml-2 w-5 h-5" />
        </PrimaryButton>

        {/* Secure note */}
        <div className="mt-8 p-4 bg-primary-400/10 rounded-lg border border-primary-400/20">
          <p className="text-sm text-primary-400 mb-2">
            <Shield className="inline w-4 h-4 mr-1" />
            Secure Payment
          </p>
          <p className="text-xs text-gray-300">
            Your payment information is encrypted and secure. We never store
            your credit card details.
          </p>
        </div>
      </form>
    </div>
  );
};
