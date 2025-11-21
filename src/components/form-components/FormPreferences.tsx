import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { FormData } from "../QuoteForm";

type FormPreferencesProps = {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
};

export default function FormPreferences({
  formData,
  updateFormData,
}: FormPreferencesProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-4 block">
          Budget Range
        </Label>
        <RadioGroup
          value={formData.budgetRange}
          onValueChange={(value) => updateFormData("budgetRange", value)}
        >
          {[
            { value: "under-2500", label: "Under $2,500" },
            { value: "2500-5000", label: "$2,500 - $5,000" },
            { value: "5000-10000", label: "$5,000 - $10,000" },
            { value: "10000-20000", label: "$10,000 - $20,000" },
            { value: "20000-plus", label: "$20,000+" },
            {
              value: "flexible",
              label: "Flexible - depends on services",
            },
          ].map((budget) => (
            <div key={budget.value} className="flex items-center space-x-2">
              <RadioGroupItem value={budget.value} id={budget.value} />
              <Label htmlFor={budget.value}>{budget.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="style">Event Style/Theme</Label>
        <Select
          value={formData.style}
          onValueChange={(value) => updateFormData("style", value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select your preferred style" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="elegant-classic">Elegant & Classic</SelectItem>
            <SelectItem value="modern-chic">Modern & Chic</SelectItem>
            <SelectItem value="rustic-romantic">Rustic & Romantic</SelectItem>
            <SelectItem value="bohemian">Bohemian</SelectItem>
            <SelectItem value="minimalist">Minimalist</SelectItem>
            <SelectItem value="vintage">Vintage</SelectItem>
            <SelectItem value="tropical">Tropical</SelectItem>
            <SelectItem value="glamorous">Glamorous</SelectItem>
            <SelectItem value="not-sure">Not sure yet</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="colorScheme">Preferred Color Scheme</Label>
        <Input
          id="colorScheme"
          value={formData.colorScheme}
          onChange={(e) => updateFormData("colorScheme", e.target.value)}
          placeholder="e.g., Blush pink and gold, Navy and white, etc."
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="inspiration">
          Inspiration or Additional Preferences
        </Label>
        <Textarea
          id="inspiration"
          value={formData.inspiration}
          onChange={(e) => updateFormData("inspiration", e.target.value)}
          placeholder="Share any inspiration images, Pinterest boards, or specific preferences you have..."
          className="mt-1"
          rows={4}
        />
      </div>
    </div>
  );
}
