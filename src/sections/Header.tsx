import { useState } from "react";
import QuoteFormDeco from "./QuoteForm/quoteForm";

export default function Header() {
  const [modalQuote, setmodalQuote] = useState(false);

  return (
    <>
      <header className="bg-primary/90 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <img src="main-logo.png" alt="" className="max-h-[30px]" />
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#events"
                className="text-primary-foreground hover:text-secondary transition-colors"
              >
                Events
              </a>
              <a
                href="#products"
                className="text-primary-foreground hover:text-secondary transition-colors"
              >
                Rentals
              </a>
              <a
                href="#faq"
                className="text-primary-foreground hover:text-secondary transition-colors"
              >
                FAQ
              </a>
              <a
                href="#testimonials"
                className="text-primary-foreground hover:text-secondary transition-colors"
              >
                Reviews
              </a>
              <a
                href="#contact"
                className="text-primary-foreground hover:text-secondary transition-colors"
              >
                Contact
              </a>
            </nav>

            <div>
              {/* Button to open the form */}
              <button
                type="button"
                onClick={() => setmodalQuote(true)}
                className="bg-[#ffffff] hover:bg-[#ffd9d9] text-[#7A1314] px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </header>
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
    </>
  );
}
