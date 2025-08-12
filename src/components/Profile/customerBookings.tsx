import { useCustomer } from "@/context/authProvider";
import { Calendar, MapPin, Phone, User } from "lucide-react";
import React, { useState, useTransition } from "react";
import { formatFriendlyDate } from "@/lib/utils/general";
import { BookMode } from "@/interfaces/hero";
import { BookingStatus } from "@/interfaces/booking";
import { Modal } from "../CodidgeUI/modal";
import { TwoConfirmationWidget } from "../CodidgeUI/modal/twoConfirmationWidget";
import { updateBookingAction } from "@/lib/actions/booking";

export const statusHexColors: Record<BookingStatus, string> = {
  [BookingStatus.payment_failed]: "#F97316", // orange-500
  [BookingStatus.confirmed]: "#3B82F6", // blue-500
  [BookingStatus.in_progress]: "#6366F1", // indigo-500
  [BookingStatus.completed]: "#10B981", // green-500
  [BookingStatus.cancelled]: "#EF4444", // red-500
  [BookingStatus.refunded]: "#8B5CF6", // purple-500
};

export const CustomerBookings = () => {
  const { customerBookings, updateBooking } = useCustomer();
  const [bookId, setBookId] = useState<string>("");

  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      {/* Upcoming Bookings */}
      <div className="bg-gray-900 rounded-xl p-6">
        <h3 className="text-xl font-semibold mb-4 text-primary-400">
          Upcoming Bookings
        </h3>
        {customerBookings?.upcoming?.map(
          (booking) =>
            booking?.bookingCode && (
              <div
                key={booking.id}
                className="bg-black rounded-lg p-4 border border-gray-700 mb-4"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-primary-400">
                      Booking #{booking.bookingCode}
                    </p>
                    <p className="text-sm text-gray-300">
                      {booking.bookingBusinessData.car.carType.name}
                    </p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: `${statusHexColors[booking.status]}40`, // 20 = 12.5% opacity
                      color: statusHexColors[booking.status],
                    }}
                  >
                    {booking.status.toLocaleUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <div className="block md:flex items-center space-x-1 space-y-1">
                      <div className="flex">
                        <Calendar className="w-4 h-4 text-primary-400 mr-2" />
                        <span>Pickup:</span>
                      </div>
                      <span className="text-gray-300">
                        {formatFriendlyDate(booking.startDate)}
                      </span>
                    </div>
                    <div className="block md:flex items-center space-x-1 space-y-1">
                      <div className="flex">
                        <Calendar className="w-4 h-4 text-primary-400 mr-2" />
                        <span>Aprox. DropOff:</span>
                      </div>

                      <span className="text-gray-300">
                        {formatFriendlyDate(booking.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 text-primary-400 mr-2" />
                      {booking.bookingBusinessData.bookMode ===
                      BookMode.trip ? (
                        <span>
                          {
                            booking.bookingBusinessData.pickupLocation
                              .displayName
                          }{" "}
                          →{" "}
                          {
                            booking.bookingBusinessData.dropoffLocation
                              .displayName
                          }
                        </span>
                      ) : (
                        <span>
                          {
                            booking.bookingBusinessData.pickupLocation
                              .displayName
                          }{" "}
                          ({booking.bookingBusinessData.bookHours} hours)
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-primary-400 mr-2" />
                      <span>
                        Chauffeur: {booking.bookingBusinessData.driver.name}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-primary-400 mr-2" />
                      <span>{booking.bookingBusinessData.driver.phone}</span>
                    </div>
                  </div>
                </div>

                {booking.status !== BookingStatus.cancelled && (
                  <div className="mt-4 flex space-x-3">
                    <button
                      onClick={() => {
                        setBookId(booking.id);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            )
        )}
      </div>

      {/* Past Bookings */}
      {customerBookings?.past?.length! > 0 && (
        <div className="bg-gray-900 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-primary-400">
            Past Bookings
          </h3>
          {customerBookings?.past.map((booking) => (
            <div
              key={booking.id}
              className="bg-black rounded-lg p-4 border border-gray-700 mb-4"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-primary-400">
                    Booking #{booking.bookingCode}
                  </p>
                  <p className="text-sm text-gray-300">
                    {booking.bookingBusinessData.car.carType.name}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: `${statusHexColors[booking.status]}40`, // 20 = 12.5% opacity
                      color: statusHexColors[booking.status],
                    }}
                  >
                    {booking.status.toLocaleUpperCase()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-primary-400 mr-2" />
                    <span>Pickup:</span>
                    <span className="text-gray-300">
                      {formatFriendlyDate(booking.startDate)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-primary-400 mr-2" />
                    <span>
                      {booking.bookingBusinessData.pickupLocation.displayName} →{" "}
                      {booking.bookingBusinessData.dropoffLocation.displayName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal
        className="!max-w-lg mx-auto !bg-gray-900 !bg-opacity-10 !backdrop-blur-md rounded-2xl p-8 !shadow-2xl border !border-primary-400/20"
        isOpen={!!bookId}
        onClose={() => {
          setBookId("");
        }}
      >
        <TwoConfirmationWidget
          title="Are you sure you want to cancel this trip?"
          onConfirm={() => {
            startTransition(async () => {
              try {
                const updatedBook = await updateBookingAction({
                  bookingId: bookId,
                  input: {
                    status: BookingStatus.cancelled,
                  },
                });
                if (updatedBook) {
                  setBookId("");
                  updateBooking(updatedBook);
                }
              } catch (error) {
                setBookId("");
                console.log("::error updating book");
              }
            });
          }}
          loading={isPending}
          onCancel={() => {
            setBookId("");
          }}
        />
      </Modal>
    </div>
  );
};
