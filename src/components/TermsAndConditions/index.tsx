import { useState } from "react";
import { Controller, Control } from "react-hook-form";
import Checkbox from "../CodidgeUI/Checkbox";
import { Modal } from "../CodidgeUI/modal";

interface TermsAndConditionsProps {
  control?: Control<any>;
  name?: string;
}

export const TermsAndConditions = ({
  control,
  name = "terms",
}: TermsAndConditionsProps) => {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {control ? (
        <Controller
          control={control}
          name={name}
          rules={{ required: "You must agree to the Terms & Conditions" }}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div className="flex flex-col gap-1">
              <label className="flex items-center gap-2">
                <Checkbox checked={!!value} onChange={onChange} />
                <span className="text-sm">
                  I agree to the{" "}
                  <button
                    type="button"
                    className="text-yellow-600 hover:underline"
                    onClick={() => setShowTerms(true)}
                  >
                    Terms & Conditions
                  </button>
                </span>
              </label>
              {error && <p className="text-sm text-red-500">{error.message}</p>}
            </div>
          )}
        />
      ) : (
        <span>
          I agree to the{" "}
          <button
            type="button"
            className="text-yellow-600 hover:underline"
            onClick={() => setShowTerms(true)}
          >
            Terms & Conditions
          </button>
        </span>
      )}
      {/* Modal with Terms */}
      <Modal
        className="max-w-3/4 min-h-1/2"
        isOpen={showTerms}
        onClose={() => {
          setShowTerms(false);
        }}
      >
        <div className="p-6 !text-gray-600 text-left space-y-4 max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">Terms and Conditions</h2>

          <h3 className="text-lg font-medium">
            Golden Wheels Private Chauffeur – Luxury Without Compromise
          </h3>

          <h4 className="font-semibold mt-4">1. Introduction</h4>
          <p>
            Welcome to Golden Wheels Private Chauffeur, the highest standard in
            private luxury transportation in Miami and surrounding areas. By
            booking our services, you agree to an experience defined by
            elegance, comfort, and absolute discretion, and accept the following
            Terms and Conditions designed to guarantee you an impeccable
            service.
          </p>

          <h4 className="font-semibold mt-4">
            2. Reservations and Confirmation
          </h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              All reservations must be made through our official platform or
              authorized channels.
            </li>
            <li>
              Confirmation is subject to vehicle and chauffeur availability.
            </li>
            <li>
              To ensure the Golden Wheels experience, we recommend booking in
              advance.
            </li>
          </ul>

          <h4 className="font-semibold mt-4">3. Payments</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              We accept payments via credit card, debit card, Zelle, and
              authorized bank transfers.
            </li>
            <li>
              Our pricing reflects an all-inclusive premium service, with
              transparent rates and no hidden fees.
            </li>
            <li>
              Golden Wheels reserves the right to request a security deposit for
              certain exclusive services.
            </li>
          </ul>

          <h4 className="font-semibold mt-4">4. Cancellations and Refunds</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Cancellations made more than 48 hours in advance: full refund.
            </li>
            <li>
              Cancellations made less than 48 hours in advance: 50% of the
              contracted fare will be charged.
            </li>
            <li>
              Cancellations made less than 24 hours in advance: non-refundable.
            </li>
            <li>
              If Golden Wheels must cancel a service due to force majeure, the
              client will be offered a full refund or a complimentary upgrade on
              the next reservation.
            </li>
          </ul>

          <h4 className="font-semibold mt-4">5. Passenger Conduct</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Our distinguished passengers are expected to maintain appropriate
              and respectful behavior during the journey.
            </li>
            <li>
              Smoking or consumption of illegal substances is strictly
              prohibited inside the vehicles.
            </li>
            <li>
              Any damages caused to the vehicle will be the client’s
              responsibility.
            </li>
          </ul>

          <h4 className="font-semibold mt-4">6. Company Commitment</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Guaranteed punctuality: our chauffeurs arrive early and fully
              prepared.
            </li>
            <li>
              Absolute privacy: all client and travel information is handled
              with the utmost discretion.
            </li>
            <li>
              Safety and comfort: all vehicles undergo rigorous maintenance, are
              fully insured, and driven by highly trained professional
              chauffeurs.
            </li>
            <li>
              Golden Wheels is not responsible for delays caused by external
              factors (traffic, weather, accidents).
            </li>
          </ul>

          <h4 className="font-semibold mt-4">
            7. The Golden Wheels Experience
          </h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Luxury, late-model vehicles.</li>
            <li>
              Chauffeurs in professional attire, trained in executive service.
            </li>
            <li>
              Personalized amenities: premium bottled water, climate control,
              music of your choice, and first-class attention.
            </li>
          </ul>

          <h4 className="font-semibold mt-4">8. Privacy and Personal Data</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Client information will be used exclusively to manage and
              guarantee the contracted service.
            </li>
            <li>
              Golden Wheels safeguards your privacy under the highest standards
              of confidentiality.
            </li>
          </ul>

          <h4 className="font-semibold mt-4">9. Modifications</h4>
          <p>
            Golden Wheels Private Chauffeur reserves the right to update these
            Terms and Conditions in order to maintain excellence in our
            services. The current version will always be available on our
            website.
          </p>
        </div>
      </Modal>
    </div>
  );
};
