import React, { useEffect, useState, useTransition } from "react";
import { PlacesAutoCompleteWidget } from "../CodidgeUI/PlacesAutoComplete";
import Input from "../CodidgeUI/InputField";
import { Calendar, ChevronRight, Clock } from "lucide-react";
import PrimaryButton, { ButtonSize } from "../CodidgeUI/PrimaryButton";
import { BookMode, IBookingFormInput } from "../../interfaces/hero";
import { Controller, useForm } from "react-hook-form";
import Select from "../CodidgeUI/Select";
import { getCarClassesAvailables } from "@/lib/actions/booking";
import { ICarClass } from "../../interfaces/carTypes";
import { useRouter } from "next/navigation";
import { calculateEndDate, validateDateTime } from "@/lib/utils/hero";
import { toast } from "react-toastify";

const durationOptions = Array.from({ length: 23 }, (_, i) => {
  const hour = i + 2;
  return {
    value: hour,
    valueToShow: `${hour} ${hour === 1 ? "hour" : "hours"}`,
  };
});

export const BookingForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [availability, setAvailability] = useState(true);

  const methods = useForm<IBookingFormInput>({
    defaultValues: {
      startDate: "",
      endDate: "",
      bookHours: 2,
      bookMode: BookMode.trip,
      pickupLocation: {
        displayName: "",
        formattedAddress: "",
        id: "",
      },
      dropoffLocation: {
        displayName: "",
        formattedAddress: "",
        id: "",
      },
    },
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { isDirty, errors },
    watch,
    setError,
    clearErrors,
  } = methods;

  const onSubmit = async (data: IBookingFormInput) => {
    try {
      setAvailability(true);
      if (!data?.pickupLocation?.id) {
        setError("pickupLocation", {
          message: "Must enter origin",
        });
        return;
      }
      if (data.bookMode === BookMode.trip && !data?.dropoffLocation?.id) {
        setError("dropoffLocation", {
          message: "Must enter destination",
        });
        return;
      }

      const startDate = new Date(data.startDate).toISOString();

      let endDate = data.endDate
        ? new Date(data.endDate).toISOString()
        : undefined;
      let bookingDetails = { ...data, startDate, endDate };

      if (data.bookMode === BookMode.hourly) {
        const hours = data.bookHours;
        endDate = calculateEndDate(data.startDate, hours * 3600);
        bookingDetails = {
          ...bookingDetails,
          endDate,
        };
      }

      startTransition(async () => {
        try {
          const carTypes: {
            getCarTypesAvailable: {
              carTypes: ICarClass[];
              endDate: string;
            };
          } = await getCarClassesAvailables(bookingDetails);

          if (
            !carTypes.getCarTypesAvailable?.carTypes ||
            carTypes.getCarTypesAvailable?.carTypes.length === 0
          ) {
            setAvailability(false);
            return;
          }

          localStorage.setItem(
            "bookingFlow",
            JSON.stringify({
              bookingParams: {
                ...bookingDetails,
                endDate: carTypes.getCarTypesAvailable.endDate,
              },
              availableCarTypes: carTypes.getCarTypesAvailable.carTypes,
            })
          );

          router.push("/booking/select-car");
        } catch (error) {
          console.log(":::error booking select", error);
        }
      });
    } catch (error) {
      console.log(":::error", error);
    }
  };

  const startDate = watch("startDate");

  useEffect(() => {
    if (startDate) {
      const result = validateDateTime(startDate);

      if (result !== true) {
        setError("startDate", {
          type: "manual",
          message: result,
        });
      } else {
        clearErrors("startDate");
      }
    }
  }, [startDate, clearErrors, setError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 xl:space-y-6">
      <Controller
        name="bookMode"
        control={control}
        render={({ field }) => (
          <div className="flex w-full m-auto mb-4 2xl:mb-8 bg-gray-800 rounded-lg p-1">
            <button
              type="button"
              onClick={() => {
                field.onChange(BookMode.trip);
              }}
              className={`cursor-pointer flex-1 py-2 px-4 rounded-md transition-colors ${
                field.value === BookMode.trip
                  ? "bg-primary-400 text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              One Trip
            </button>
            <button
              type="button"
              onClick={() => {
                field.onChange(BookMode.hourly);
              }}
              className={`cursor-pointer flex-1 py-2 px-4 rounded-md transition-colors ${
                field.value === BookMode.hourly
                  ? "bg-primary-400 text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              By Hour
            </button>
          </div>
        )}
      />

      <div className="grid grid-cols-1 space-y-6">
        <div>
          <Controller
            name="pickupLocation"
            control={control}
            rules={{ required: "Pick Up is required" }}
            render={({ field }) => {
              return (
                <div>
                  <PlacesAutoCompleteWidget
                    label="Pickup Location"
                    placeholder="Enter pickup address"
                    initialValue={""}
                    onChange={field.onChange}
                    autoCompleteRestrictions={{
                      locationRestriction: {
                        circle: {
                          center: {
                            latitude: 25.7617,
                            longitude: -80.1918,
                          },
                          radius: 50000,
                        },
                      },
                    }}
                  />
                </div>
              );
            }}
          />
          {errors.pickupLocation && (
            <p className="text-left text-red-500 text-sm mt-1">
              {errors.pickupLocation.message}
            </p>
          )}
        </div>
        {watch("bookMode") === BookMode.hourly && (
          <div>
            <Controller
              name="bookHours"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    label="Duration"
                    placeholder="Choose hours"
                    defaultSelected={{
                      value: 2,
                      valueToShow: "2 hours",
                    }}
                    onChange={(selected) => field.onChange(selected.value)}
                    options={durationOptions}
                  />
                );
              }}
            />
          </div>
        )}
        {watch("bookMode") === BookMode.trip && (
          <div>
            <Controller
              name="dropoffLocation"
              control={control}
              render={({ field }) => (
                <PlacesAutoCompleteWidget
                  label="Destination"
                  placeholder="Enter destination address"
                  initialValue={field.value.displayName ?? ""}
                  onChange={field.onChange}
                  autoCompleteRestrictions={{
                    locationBias: {
                      circle: {
                        center: {
                          latitude: 25.7617,
                          longitude: -80.1918,
                        },
                        radius: 50000.0,
                      },
                    },
                  }}
                />
              )}
            />
            {errors.dropoffLocation && (
              <p className="text-left text-red-500 text-sm mt-1">
                {errors.dropoffLocation.message}
              </p>
            )}
          </div>
        )}

        <div>
          <Input
            label="Pick Up Date"
            rightIcon={<Calendar className="text-white" size={18} />}
            type="datetime-local"
            {...register("startDate", {
              required: "Pick up date is required",
              validate: validateDateTime,
            })}
            className={`block w-full p-2 rounded-md text-black ${
              errors.startDate ? "border-red-500" : "border-gray-300"
            }`}
          />

          {errors.startDate && (
            <p className="text-left text-red-500 text-sm mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>
      </div>

      <PrimaryButton
        disabled={!isDirty}
        type="submit"
        loading={isPending}
        size={ButtonSize.LARGE}
        className="flex items-center justify-center text-white"
      >
        Find Your Perfect Ride
        <ChevronRight className="ml-2 w-5 h-5" />
      </PrimaryButton>
      {!availability && (
        <div className="text-md text-white-600 font-semibold text-left border-l-4 border-red-500 pl-3">
          Unfortunately, we don’t have any cars available for the selected date.
          Please try choosing another date or adjust your trip details.
        </div>
      )}
      {watch("bookMode") === BookMode.hourly && (
        <div className="text-sm text-yellow-600 font-semibold border-l-4 border-yellow-500 pl-3">
          <strong>* Note:</strong> Hourly trips are limited to the Miami-Dade
          and Broward County areas (including Homestead). For trips outside this
          area, please choose the "Trip" option instead.
        </div>
      )}
    </form>
  );
};
