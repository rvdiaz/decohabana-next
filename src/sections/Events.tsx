import { Instagram } from "lucide-react";
import MyGallery from "@/components/MyGallery";
import { Badge } from "@/components/CodidgeUI/badge";

export default function Events() {
  return (
    <section id="events" className="py-10 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <Badge className="bg-red-900/10 text-red-900 hover:bg-red-900/20 px-4 py-2">
            Our Specialties
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-medium text-gray-900">
            Events We Love to Create
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
            From intimate gatherings to grand celebrations, we bring expertise
            and creativity to every occasion
          </p>
          <MyGallery />
          <h2 className="text-1xl lg:text-2xl font-bold text-gray-900">
            Want to see more?
          </h2>
          <h3 className="text-1xl lg:text-2xl font-bold text-gray-900">
            Follow us on Instagram
          </h3>
          <Badge className="bg-red-900/10 text-red-900 hover:bg-red-900/20 px-4 py-2">
            <a href="https://www.instagram.com/decohabana_usa/">
              <Instagram />
            </a>
          </Badge>
        </div>
      </div>
    </section>
  );
}
