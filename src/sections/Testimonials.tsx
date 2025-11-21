import { Star } from "lucide-react";

export type TestimonialItem = {
  name: string;
  event: string;
  rating: number;
  text: string;
};

export type TestimonialsProps = {
  testimonials: TestimonialItem[];
};

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section id="testimonials" className="py-10 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <div className="bg-[#731313]/10 text-[#731313] hover:bg-[#731313]/20 px-4 py-2">
            Client Love
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            What Our Clients Say
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6 space-y-4">
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.event}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
