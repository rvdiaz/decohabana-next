import React, { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import QuoteFormDeco from "./QuoteForm/quoteForm";

export default function Contact() {
  const [modalQuote, setmodalQuote] = useState(false);

  return (
    <section
      id="contact"
      className="py-10 lg:py-20 bg-gradient-to-r from-primary to-red-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Ready to Start Planning?
          </h2>
          <p className="text-xl text-rose-100 max-w-2xl mx-auto">
            Let's create something beautiful together. Contact us today for a
            personalized quote.
          </p>
          <button
            onClick={() => {
              setmodalQuote(true);
            }}
            className="bg-primary-foreground hover:bg-secondary text-primary px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Your Free Quote
          </button>
          {/* Modal overlay with form */}
          {modalQuote && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-screen items-center justify-center p-4">
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                  onClick={() => setmodalQuote(false)}
                />

                {/* Form container */}
                <div className="relative z-10 w-full max-w-4xl">
                  <QuoteFormDeco onClose={() => setmodalQuote(false)} />
                </div>
              </div>
            </div>
          )}
          <div className="grid md:grid-cols-3 gap-8 pt-12">
            <div className="text-center space-y-2">
              <Phone className="h-8 w-8 text-white mx-auto" />
              <div className="text-white font-semibold">Call Us</div>
              <a href="tel:2394517929" className="text-rose-100">
                (239) 451-7929
              </a>
            </div>

            <div className="text-center space-y-2">
              <Mail className="h-8 w-8 text-white mx-auto" />
              <div className="text-white font-semibold">Email Us</div>

              <a
                href={`mailto:decohabanausa@gmail.com?subject=Información sobre servicios&body=Hola DecoHabana,%0D%0A%0D%0AEstoy interesado(a) en sus servicios. Me gustaría recibir más información.%0D%0A%0D%0A¡Gracias!`}
                className="text-rose-100"
              >
                decohabanausa@gmail.com
              </a>
            </div>
            <div className="text-center space-y-2">
              <MapPin className="h-8 w-8 text-white mx-auto" />
              <div className="text-rose-100">Naples, Florida</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
