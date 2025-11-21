import { useState } from "react";
import { ChevronRight } from "lucide-react";
import MyCarousel from "@/components/MyCarousel";
import QuoteFormDeco from "./QuoteForm/quoteForm";
import { images, text } from "@/core/slide-images";
import { Badge } from "@/components/CodidgeUI/badge";

export default function Hero() {
  const [modalQuote, setmodalQuote] = useState(false);

  return (
    <section className="relative py-10 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-red-100 to-white"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/10 !text-primary hover:bg-primary/20 hover:!text-white px-4 py-2">
                ✨ Creating Magical Moments Since 2015
              </Badge>
              <h1 className="text-3xl lg:text-4xl font-medium text-gray-900 leading-tight">
                Drawing
                <span className="bg-gradient-to-r from-primary to-pink-700 bg-clip-text text-transparent">
                  {" "}
                  parties{" "}
                </span>
              </h1>
              <p className="text-xl text-gray-900 leading-relaxed font-light">
                At Decohabana, we don’t just decorate events — we tell stories
                through details. Based in Naples, Florida, we transform spaces
                into memorable experiences.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setmodalQuote(true);
                }}
                className="cursor-pointer bg-secondary hover:bg-primary text-primary hover:text-secondary px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                Start Planning Your Event
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-1 border-primary text-primary hover:text-primary hover:bg-secondary px-8 py-4 rounded-full text-lg font-medium transition-all duration-300">
                <a href="#events">View Our Work</a>
              </button>
              {/* Modal overlay with form */}
              {modalQuote && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                  <div className="flex min-h-screen items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 bg-white/30 backdrop-blur-sm transition-opacity"
                      onClick={() => setmodalQuote(false)}
                    />

                    {/* Form container */}
                    <div className="relative z-10 w-full max-w-4xl">
                      <QuoteFormDeco onClose={() => setmodalQuote(false)} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-primary">Events Planned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-primary">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10+</div>
                <div className="text-primary">Years Experience</div>
              </div>
            </div>
          </div>
          <MyCarousel images={images} text={text} />
        </div>
      </div>
    </section>
  );
}
