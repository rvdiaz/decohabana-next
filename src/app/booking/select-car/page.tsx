'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Car } from '@/types';
import { saveBookingData, getBookingData } from '@/lib/booking-storage';

const CarSelectionPage: React.FC = () => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState(getBookingData());
  const [selectedCarId, setSelectedCarId] = useState<string | null>(bookingData.selectedCar?.id || null);

  useEffect(() => {
    const data = getBookingData();
    setBookingData(data);
    
    // Redirect if no booking data
    if (!data.from || !data.to || !data.date || !data.time) {
      router.push('/');
    }
  }, [router]);

  const cars: Car[] = [
    {
      id: '1',
      name: 'Executive Sedan',
      type: 'Business Class',
      image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 120,
      capacity: 3,
      features: ['WiFi', 'Climate Control', 'Premium Sound', 'Privacy Partition'],
      description: 'Perfect for business meetings and airport transfers with professional chauffeur service.'
    },
    {
      id: '2',
      name: 'Luxury SUV',
      type: 'Premium',
      image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 180,
      capacity: 6,
      features: ['Spacious Interior', 'Entertainment System', 'Refreshment Bar', 'Tinted Windows'],
      description: 'Ideal for group travel and special occasions with maximum comfort and style.'
    },
    {
      id: '3',
      name: 'Stretch Limousine',
      type: 'Ultra Luxury',
      image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 350,
      capacity: 10,
      features: ['Full Bar', 'LED Lighting', 'Premium Sound System', 'Luxury Seating'],
      description: 'The ultimate luxury experience for weddings, proms, and special celebrations.'
    },
    {
      id: '4',
      name: 'Party Bus',
      type: 'Group Luxury',
      image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 500,
      capacity: 20,
      features: ['Dance Floor', 'Full Bar', 'Premium Audio', 'Disco Lights', 'Leather Seating'],
      description: 'Perfect for bachelor parties, birthdays, and group celebrations with ultimate entertainment.'
    }
  ];

  const handleCarSelect = (car: Car) => {
    setSelectedCarId(car.id);
    const updatedData = saveBookingData({ selectedCar: car });
    setBookingData(updatedData);
  };

  const handleNext = () => {
    if (selectedCarId) {
      router.push('/booking/account');
    }
  };

  const handlePrev = () => {
    router.push('/');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={handlePrev}
                className="mr-4 p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold">Select Your Vehicle</h1>
            </div>
            <div className="text-sm">
              <p>{bookingData.from} → {bookingData.to}</p>
              <p>{bookingData.date} at {bookingData.time}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-900 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-sm font-bold text-black">✓</div>
                <span className="ml-2 text-sm">Booking Details</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-black">2</div>
                <span className="ml-2 text-sm text-yellow-400">Select Vehicle</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <span className="ml-2 text-sm text-gray-400">Account</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <span className="ml-2 text-sm text-gray-400">Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Car Selection */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cars.map((car) => (
            <div
              key={car.id}
              className={`bg-gray-900 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedCarId === car.id ? 'border-yellow-400 shadow-2xl shadow-yellow-400/20' : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => handleCarSelect(car)}
            >
              <div className="relative">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/70 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold">
                  {car.type}
                </div>
                {selectedCarId === car.id && (
                  <div className="absolute inset-0 bg-yellow-400/20 flex items-center justify-center">
                    <div className="bg-yellow-400 text-black p-3 rounded-full">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-yellow-400">{car.name}</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{formatPrice(car.price)}</div>
                    <div className="text-sm text-gray-400">per hour</div>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <Users className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="text-sm">Up to {car.capacity} passengers</span>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">{car.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {car.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-yellow-400/20 text-yellow-400 px-3 py-1 rounded-full text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terms and Conditions */}
        <div className="mt-12 bg-gray-900 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">Terms & Conditions</h3>
          <div className="text-sm text-gray-300 space-y-2">
            <p>• Minimum booking duration: 2 hours</p>
            <p>• Cancellation policy: 24 hours notice required</p>
            <p>• Additional fees may apply for tolls, parking, and gratuity</p>
            <p>• Professional chauffeur included in all bookings</p>
          </div>
          <a href="#" className="text-yellow-400 hover:text-yellow-300 text-sm underline mt-2 inline-block">
            Read full Terms & Conditions
          </a>
        </div>

        {/* Continue Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleNext}
            disabled={!selectedCarId}
            className={`px-12 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center mx-auto ${
              selectedCarId
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-105'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue to Account
            <ChevronRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarSelectionPage;