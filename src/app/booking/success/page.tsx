"use client";

import React, { useEffect } from "react";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Car,
  User,
  MailCheck,
  PhoneIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useBooking } from "@/context/bookingProvider";
import { formatFriendlyDate } from "@/lib/utils/general";
import { useCustomer } from "@/context/authProvider";

const SuccessPage: React.FC = () => {
  const { bookingParams, selectedCarType, setBookingState, bookingCode } =
    useBooking();
  const { customer } = useCustomer();

  const router = useRouter();

  const handleNewBooking = () => {
    router.push("/");
  };

  useEffect(() => {
    if (bookingCode) {
      setBookingState({
        paid: true,
      });
    }
  }, [bookingCode]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-green-100">
            Thank you for choosing Prestige Rides
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Booking Details */}
        <div className="bg-gray-900 rounded-xl p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-primary-400 mb-2">
                Booking Details
              </h2>
              <p className="text-gray-300">
                Booking ID:{" "}
                <span className="font-mono text-primary-400">
                  {bookingCode}
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start">
                <Car size={18} className="w-5 h-5 text-primary-400 mr-3 mt-1" />
                <div className="w-fit">
                  <p className="font-semibold">Vehicle</p>
                  <p className="text-gray-300">{selectedCarType?.name}</p>
                  <p className="text-sm text-gray-400">
                    {selectedCarType?.description}
                  </p>
                </div>
              </div>

              {bookingParams?.startDate && (
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-primary-400 mr-3 mt-1" />
                  <div className="w-fit">
                    <p className="font-semibold">Date & Time</p>
                    <p className="text-gray-300">
                      {formatFriendlyDate(bookingParams?.startDate)}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-primary-400 mr-3 mt-1" />
                <div className="w-fit">
                  <p className="font-semibold">Route</p>
                  <p className="text-gray-300">
                    From: {bookingParams?.pickupLocation.displayName}
                  </p>
                  <p className="text-gray-300">
                    To: {bookingParams?.dropoffLocation.displayName}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="font-semibold text-primary-400 mb-2">
                  Customer Information
                </p>
                <div className="space-y-2">
                  {customer?.name && (
                    <p className="text-gray-100 flex items-center gap-2">
                      <User size={18} /> {customer?.name}
                    </p>
                  )}
                  {customer?.email && (
                    <p className="text-gray-100 flex items-center gap-2">
                      <MailCheck size={18} /> {customer?.email}
                    </p>
                  )}
                  {customer?.phone && (
                    <p className="text-gray-100 flex items-center gap-2">
                      <PhoneIcon size={18} /> {customer?.phone}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <p className="font-semibold text-primary-400 mb-2">
                  Payment Status
                </p>
                <p className="text-green-400">✓ Payment Confirmed</p>
                <p className="text-gray-300 text-sm">
                  {/*   Card ending in ****{bookingData.payment?.cardNumber.slice(-4)} */}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Instructions */}
        <div className="bg-gray-900 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary-400 mb-6">
            Pickup Instructions
          </h2>

          <div className="space-y-6">
            <div className="flex items-start">
              <Clock className="w-5 h-5 text-primary-400 mr-3 mt-1" />
              <div>
                <p className="font-semibold">Arrival Time</p>
                <p className="text-gray-300">
                  Your chauffeur will arrive 15 minutes before your scheduled
                  pickup time
                </p>
                <p className="text-primary-400 font-semibold">
                  {/*   Expected arrival: {bookingData.time} */}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="w-5 h-5 text-primary-400 mr-3 mt-1" />
              <div>
                <p className="font-semibold">Chauffeur Contact</p>
                <p className="text-gray-300">
                  You will receive your chauffeur's contact information 1 hour
                  before pickup
                </p>
                <p className="text-primary-400">Emergency: +1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-primary-400 mr-3 mt-1" />
              <div>
                <p className="font-semibold">Pickup Location</p>
                {/*  <p className="text-gray-300">{bookingData.from}</p> */}
                <p className="text-sm text-gray-400">
                  Please be ready at the designated pickup location
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-primary-400/10 rounded-xl p-6 border border-primary-400/20">
          <h3 className="text-lg font-semibold text-primary-400 mb-4">
            Important Notes
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              • Please be ready 5 minutes before your scheduled pickup time
            </li>
            <li>
              • Your chauffeur will wait for up to 15 minutes after the
              scheduled time
            </li>
            <li>• Additional waiting time will be charged at $2 per minute</li>
            <li>
              • For any changes or cancellations, please contact us at least 24
              hours in advance
            </li>
            <li>• Gratuity is not included but greatly appreciated</li>
          </ul>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center">
          <p className="text-gray-300 mb-4">Need assistance? Contact us:</p>
          <div className="flex justify-center space-x-8">
            <a
              href="tel:+15551234567"
              className="flex items-center text-primary-400 hover:text-primary-300"
            >
              <Phone className="w-4 h-4 mr-2" />
              +1 (555) 123-4567
            </a>
            <a
              href="mailto:support@prestigerides.com"
              className="flex items-center text-primary-400 hover:text-primary-300"
            >
              <Mail className="w-4 h-4 mr-2" />
              support@prestigerides.com
            </a>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-primary-400 mb-4">
            Thank You!
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We appreciate your business and look forward to providing you with
            an exceptional luxury transportation experience. Your satisfaction
            is our priority, and we're committed to making your journey
            memorable.
          </p>

          <div className="mt-8 space-x-4">
            <button
              onClick={handleNewBooking}
              className="bg-gradient-to-r from-primary-400 to-primary-600 text-black font-semibold py-3 px-8 rounded-lg hover:from-primary-500 hover:to-primary-700 transition-all duration-300 transform hover:scale-105"
            >
              Book Another Ride
            </button>
            <Link
              href="/dashboard"
              className="inline-block bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-600 transition-colors"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
