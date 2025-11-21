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
import { FormData } from "../QuoteForm";

type FormContactProps = {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
};
export default function FormContact({
  formData,
  updateFormData,
}: FormContactProps) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateFormData("firstName", e.target.value)}
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateFormData("lastName", e.target.value)}
            className="mt-1"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          className="mt-1"
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
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
          value={formData.preferredContact}
          onValueChange={(value) => updateFormData("preferredContact", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="contact-email" />
            <Label htmlFor="contact-email">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="phone" id="contact-phone" />
            <Label htmlFor="contact-phone">Phone Call</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="text" id="contact-text" />
            <Label htmlFor="contact-text">Text Message</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="timeline">When do you need a response?</Label>
        <Select
          value={formData.timeline}
          onValueChange={(value) => updateFormData("timeline", value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select timeline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asap">ASAP</SelectItem>
            <SelectItem value="within-24hrs">Within 24 hours</SelectItem>
            <SelectItem value="within-week">Within a week</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
