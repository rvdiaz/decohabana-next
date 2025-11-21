import { staticImages } from "@/core/gallery";

export default function MyGallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {staticImages.map((src, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 aspect-square" // Añade aspect-square para relación 1:1
        >
          <div className="relative w-full h-full group">
            {" "}
            {/* Contenedor relativo */}
            <img
              src={src}
              alt={`Gallery ${index + 1}`}
              className="absolute w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
