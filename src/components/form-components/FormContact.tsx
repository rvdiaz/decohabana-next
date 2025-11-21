import { FormData } from "../QuoteForm";
import Input from "../CodidgeUI/InputField";
import Select, { ISelectOption } from "../CodidgeUI/Select";
import Label from "../CodidgeUI/Label";
import RadioGroup from "../CodidgeUI/radioButton";

type FormContactProps = {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
};

const contactMethodOptions = [
  { value: "email", label: "Email", id: "contact-email" },
  { value: "phone", label: "Phone Call", id: "contact-phone" },
  { value: "text", label: "Text Message", id: "contact-text" },
];

const timelineOptions: ISelectOption[] = [
  { value: "asap", valueToShow: "ASAP", available: true },
  { value: "within-24hrs", valueToShow: "Within 24 hours", available: true },
  { value: "within-week", valueToShow: "Within a week", available: true },
  { value: "flexible", valueToShow: "Flexible", available: true },
];

export default function FormContact({
  formData,
  updateFormData,
}: FormContactProps) {
  const selectedTimeline = timelineOptions.find(
    (opt) => opt.value === formData.timeline
  );

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Input
            label="First Name *"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateFormData("firstName", e.target.value)}
            className="mt-1"
            required
          />
        </div>
        <div>
          <Input
            label="Last Name *"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateFormData("lastName", e.target.value)}
            className="mt-1"
            required
          />
        </div>
      </div>

      <div>
        <Input
          label="Email Address *"
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          className="mt-1"
          required
        />
      </div>

      <div>
        <Input
          label="Phone Number *"
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateFormData("phone", e.target.value)}
          className="mt-1"
          required
        />
      </div>

      <div>
        <Label className="text-base font-semibold mb-4 block">
          Preferred Contact Method
        </Label>
        <RadioGroup
          options={contactMethodOptions}
          value={formData.preferredContact}
          onChange={(value) => updateFormData("preferredContact", value)}
          name="preferredContact"
        />
      </div>

      <div>
        <Select
          label="When do you need a response?"
          options={timelineOptions}
          defaultSelected={selectedTimeline}
          onChange={(selected) => updateFormData("timeline", selected.value)}
          placeholder="Select timeline"
        />
      </div>
    </div>
  );
}
