import React from "react";
import { FormData } from "../QuoteForm";
import { eventTypes } from "@/core/eventTypes";
import Input from "../CodidgeUI/InputField";
import Select, { ISelectOption } from "../CodidgeUI/Select";
import Label from "../CodidgeUI/Label";

type FormEventDetailsProps = {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
};

const guestCountOptions: ISelectOption[] = [
  { value: "1-25", valueToShow: "1-25 guests", available: true },
  { value: "26-50", valueToShow: "26-50 guests", available: true },
  { value: "51-100", valueToShow: "51-100 guests", available: true },
  { value: "101-200", valueToShow: "101-200 guests", available: true },
  { value: "201-300", valueToShow: "201-300 guests", available: true },
  { value: "300+", valueToShow: "300+ guests", available: true },
];

export default function FormEventDetails({
  formData,
  updateFormData,
}: FormEventDetailsProps) {
  const selectedGuestCount = guestCountOptions.find(
    (opt) => opt.value === formData.guestCount
  );

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-4 block">
          What type of event are you planning?
        </Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {eventTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <div
                key={type.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md rounded-lg border ${
                  formData.eventType === type.id
                    ? "ring-2 ring-red-900 bg-red-900/5 border-red-900"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => updateFormData("eventType", type.id)}
              >
                <div className="p-4 text-center">
                  <div
                    className={`inline-flex p-2 rounded-full mb-2 ${type.color}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-medium">{type.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Input
            label="Event Date"
            id="eventDate"
            type="date"
            value={formData.eventDate}
            onChange={(e) => updateFormData("eventDate", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Input
            label="Event Time"
            id="eventTime"
            type="time"
            value={formData.eventTime}
            onChange={(e) => updateFormData("eventTime", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Select
          label="Expected Number of Guests"
          options={guestCountOptions}
          defaultSelected={selectedGuestCount}
          onChange={(selected) => updateFormData("guestCount", selected.value)}
          placeholder="Select guest count"
        />
      </div>

      <div>
        <Input
          label="Venue Name (if decided)"
          id="venue"
          value={formData.venue}
          onChange={(e) => updateFormData("venue", e.target.value)}
          placeholder="Enter venue name or 'Not decided yet'"
          className="mt-1"
        />
      </div>

      <div>
        <Input
          label="Venue Address/City"
          id="venueAddress"
          value={formData.venueAddress}
          onChange={(e) => updateFormData("venueAddress", e.target.value)}
          placeholder="Enter venue address or city"
          className="mt-1"
        />
      </div>
    </div>
  );
}
