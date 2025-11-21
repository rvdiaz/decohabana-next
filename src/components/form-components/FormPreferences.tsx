import Input from "../CodidgeUI/InputField";
import TextArea from "../CodidgeUI/TextArea";
import Select, { ISelectOption } from "../CodidgeUI/Select";
import Label from "../CodidgeUI/Label";
import { FormData } from "../QuoteForm";
import RadioGroup from "../CodidgeUI/radioButton";

type FormPreferencesProps = {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
};

const budgetOptions = [
  { value: "under-2500", label: "Under $2,500", id: "under-2500" },
  { value: "2500-5000", label: "$2,500 - $5,000", id: "2500-5000" },
  { value: "5000-10000", label: "$5,000 - $10,000", id: "5000-10000" },
  { value: "10000-20000", label: "$10,000 - $20,000", id: "10000-20000" },
  { value: "20000-plus", label: "$20,000+", id: "20000-plus" },
  {
    value: "flexible",
    label: "Flexible - depends on services",
    id: "flexible",
  },
];

const styleOptions: ISelectOption[] = [
  {
    value: "elegant-classic",
    valueToShow: "Elegant & Classic",
    available: true,
  },
  { value: "modern-chic", valueToShow: "Modern & Chic", available: true },
  {
    value: "rustic-romantic",
    valueToShow: "Rustic & Romantic",
    available: true,
  },
  { value: "bohemian", valueToShow: "Bohemian", available: true },
  { value: "minimalist", valueToShow: "Minimalist", available: true },
  { value: "vintage", valueToShow: "Vintage", available: true },
  { value: "tropical", valueToShow: "Tropical", available: true },
  { value: "glamorous", valueToShow: "Glamorous", available: true },
  { value: "not-sure", valueToShow: "Not sure yet", available: true },
];

export default function FormPreferences({
  formData,
  updateFormData,
}: FormPreferencesProps) {
  const selectedStyle = styleOptions.find(
    (opt) => opt.value === formData.style
  );

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-4 block">
          Budget Range
        </Label>
        <RadioGroup
          options={budgetOptions}
          value={formData.budgetRange}
          onChange={(value) => updateFormData("budgetRange", value)}
          name="budgetRange"
        />
      </div>

      <div>
        <Select
          label="Event Style/Theme"
          options={styleOptions}
          defaultSelected={selectedStyle}
          onChange={(selected) => updateFormData("style", selected.value)}
          placeholder="Select your preferred style"
        />
      </div>

      <div>
        <Input
          label="Preferred Color Scheme"
          id="colorScheme"
          value={formData.colorScheme}
          onChange={(e) => updateFormData("colorScheme", e.target.value)}
          placeholder="e.g., Blush pink and gold, Navy and white, etc."
          className="mt-1"
        />
      </div>

      <div>
        <TextArea
          label="Inspiration or Additional Preferences"
          value={formData.inspiration}
          onChange={(e: any) => updateFormData("inspiration", e.target.value)}
          placeholder="Share any inspiration images, Pinterest boards, or specific preferences you have..."
          className="mt-1"
          rows={4}
        />
      </div>
    </div>
  );
}
