import React from "react";
import { Label } from "../ui/label";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { eventTypes } from "../../app/db/eventTypes";
import { FormData } from "../QuoteForm";

type FormEventDetailsProps = {
  formData: FormData;
  updateFormData: (field: string, value: any) => void;
};

export default function FormEventDetails({
  formData,
  updateFormData,
}: FormEventDetailsProps) {
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
              <Card
                key={type.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  formData.eventType === type.id
                    ? "ring-2 ring-red-900 bg-red-900/5"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => updateFormData("eventType", type.id)}
              >
                <CardContent className="p-4 text-center">
                  <div
                    className={`inline-flex p-2 rounded-full mb-2 ${type.color}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="text-sm font-medium">{type.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="eventDate">Event Date</Label>
          <Input
            id="eventDate"
            type="date"
            value={formData.eventDate}
            onChange={(e) => updateFormData("eventDate", e.target.value)}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="eventTime">Event Time</Label>
          <Input
            id="eventTime"
            type="time"
            value={formData.eventTime}
            onChange={(e) => updateFormData("eventTime", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="guestCount">Expected Number of Guests</Label>
        <Select
          value={formData.guestCount}
          onValueChange={(value) => updateFormData("guestCount", value)}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select guest count" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-25">1-25 guests</SelectItem>
            <SelectItem value="26-50">26-50 guests</SelectItem>
            <SelectItem value="51-100">51-100 guests</SelectItem>
            <SelectItem value="101-200">101-200 guests</SelectItem>
            <SelectItem value="201-300">201-300 guests</SelectItem>
            <SelectItem value="300+">300+ guests</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="venue">Venue Name (if decided)</Label>
        <Input
          id="venue"
          value={formData.venue}
          onChange={(e) => updateFormData("venue", e.target.value)}
          placeholder="Enter venue name or 'Not decided yet'"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="venueAddress">Venue Address/City</Label>
        <Input
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
