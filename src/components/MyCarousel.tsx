"use client";

import { CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

type MyCarouselProps = {
  images: string[];
  text: string;
};

export default function MyCarousel({ images, text }: MyCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); // cambia cada 3 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Slide ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Indicadores opcionales */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>

      <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-full">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <div className="font-semibold text-gray-900">Event Completed</div>
            <div className="text-sm text-gray-500">{text}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
