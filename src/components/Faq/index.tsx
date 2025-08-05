"use client";

import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

const faqData = [
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 24 hours in advance for regular services. For special events like weddings or proms, we suggest booking 2-4 weeks ahead to ensure availability of your preferred vehicle.",
  },
  {
    question: "What is included in the service?",
    answer:
      "Our service includes a professional chauffeur, fuel, insurance, and basic amenities. Additional services like refreshments, decorations, or extended waiting time can be arranged for an additional fee.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellations made 24 hours or more before the scheduled service receive a full refund. Cancellations within 24 hours are subject to a 50% cancellation fee.",
  },
  {
    question: "Do you provide service outside the city?",
    answer:
      "Yes, we provide long-distance transportation. Additional charges may apply for destinations outside our standard service area. Please contact us for a custom quote.",
  },
  {
    question: "Are gratuities included?",
    answer:
      "Gratuities are not included in the base price but are greatly appreciated. The standard gratuity is 15-20% of the total service cost.",
  },
  {
    question: "What safety measures do you have in place?",
    answer:
      "All our chauffeurs undergo extensive background checks and regular training. Our vehicles are regularly maintained and inspected. We also carry comprehensive insurance coverage.",
  },
];

export const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  return (
    <div id="faq" className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-primary-400">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300">
            Get answers to common questions about our luxury transportation
            services
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-black rounded-xl border border-gray-700"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-800 transition-colors rounded-xl"
              >
                <span className="font-semibold text-white">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary-400 transition-transform ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFAQ === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
