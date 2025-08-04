import { ImageOff, Users } from "lucide-react";
import React from "react";
import { ICarClass } from "../../interfaces/carTypes";
import { getCarsAction } from "@/lib/actions/cars";
import { PriceDisplay } from "../CodidgeUI/priceDisplay";
import Image from "next/image";

export async function CarContainers() {
  const cars = await getCarsAction();

  return (
    <div id="fleet" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-yellow-400">
            Our Service Classes
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose from our extensive collection of luxury vehicles, each
            maintained to the highest standards and equipped with premium
            amenities for your comfort and style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars?.getCarTypes?.map((car: ICarClass, index: number) => {
            const imageWidget = car.image ? (
              <Image
                width={412}
                height={312}
                src={car.image.url}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div>
                <ImageOff />
              </div>
            );

            return (
              <div
                key={index}
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-yellow-400 transition-all duration-300 transform hover:scale-105"
              >
                <div className="relative">{imageWidget}</div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-yellow-400">
                      {car.name}
                    </h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        <PriceDisplay
                          price={{
                            amount: car.hourlyRate,
                            currencyCode: "USD",
                          }}
                        />
                      </div>
                      <div className="text-sm text-gray-400">per hour</div>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <Users className="w-5 h-5 text-yellow-400 mr-2" />
                    <span className="text-sm">
                      Up to {car.maxPassengers} passengers
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
