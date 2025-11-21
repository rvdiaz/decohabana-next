import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { FormData } from "../QuoteForm";

type FormProductsProps = {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
  handleArrayUpdate: (field: string, value: string, checked: boolean) => void;
};

export default function FormProducts({
  formData,
  updateFormData,
  handleArrayUpdate,
}: FormProductsProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-4 block">
          Services Needed (Select all that apply)
        </Label>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            "Event Planning & Coordination",
            "Venue Decoration",
            "Floral Arrangements",
            "Lighting Design",
            "Furniture & Equipment Rental",
            "Audio/Visual Equipment",
            "Photography Setup Areas",
            "Catering Setup Support",
          ].map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                id={service}
                checked={formData.services.includes(service)}
                onCheckedChange={(checked) =>
                  handleArrayUpdate("services", service, checked as boolean)
                }
              />
              <Label
                htmlFor={service}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {service}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold mb-4 block">
          Rental Items Needed (Select all that apply)
        </Label>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            "Tables (Round/Rectangle/Cocktail)",
            "Chairs (Chiavari/Ghost/Vintage)",
            "Linens & Table Settings",
            "Centerpieces",
            "Arch/Backdrop",
            "String Lights/Chandeliers",
            "Dance Floor",
            "Tents/Canopies",
            "Bar Setup",
            "Lounge Furniture",
          ].map((product) => (
            <div key={product} className="flex items-center space-x-2">
              <Checkbox
                id={product}
                checked={formData.products.includes(product)}
                onCheckedChange={(checked) =>
                  handleArrayUpdate("products", product, checked as boolean)
                }
              />
              <Label
                htmlFor={product}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {product}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="specialRequests">
          Special Requests or Additional Details
        </Label>
        <Textarea
          id="specialRequests"
          value={formData.specialRequests}
          onChange={(e) => updateFormData("specialRequests", e.target.value)}
          placeholder="Tell us about any specific requirements, themes, or special requests..."
          className="mt-1"
          rows={4}
        />
      </div>
    </div>
  );
}
