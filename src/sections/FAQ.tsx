"use client";

import { faqs } from "@/core/faq";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="bg-red-900/10 text-red-900 hover:bg-red-900/20 px-4 py-2">
            <HelpCircle className="w-4 h-4 mr-2" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Everything You Need to Know
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about our event planning
            and decoration services
          </p>
        </div>

        <div className="border-0 shadow-lg">
          <div className="p-0">
            <div className="w-full">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <span className="font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      openIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:decohabanausa@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-secondary hover:bg-primary text-primary hover:text-secondary rounded-full font-semibold transition-colors"
            >
              Email Us
            </a>
            <a
              href="tel:2394517929"
              className="inline-flex items-center justify-center px-6 py-3 border-1 bg-secondary hover:bg-primary text-primary hover:text-secondary rounded-full font-semibold transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
